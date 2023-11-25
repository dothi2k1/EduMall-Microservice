const path = require('path');
const fs = require('fs');
const { promises: fsPromises } = fs;

const handleMediaRequest = async (req, res, mediaType) => {
    try {
        const { year, month, day, filename } = req.params;
        const filePath = path.join('uploads', mediaType, year, month, day, filename);

        if (await fsPromises.access(filePath).then(() => true).catch(() => false)) {
            const mediaStream = fs.createReadStream(filePath);

            mediaStream.pipe(res);
        } else {
            res.status(404).json({ error: `${mediaType === 'video' ? 'Video' : 'Image'} not found` });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const handleVideoRequest = async (req, res) => {
    try {
        const { year, month, day, filename } = req.params;
        const filePath = path.join('uploads', 'videos', year, month, day, filename);

        if (await fsPromises.access(filePath).then(() => true).catch(() => false)) {
            const stat = await fsPromises.stat(filePath);
            const fileSize = stat.size;
            const range = req.headers.range;

            if (range) {
                const parts = range.replace(/bytes=/, "").split("-");
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

                const chunkSize = (end - start) + 1;
                const fileStream = fs.createReadStream(filePath, { start, end });

                res.writeHead(206, {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunkSize,
                    'Content-Type': 'video/mp4',
                });

                fileStream.pipe(res);
            } else {
                res.writeHead(200, {
                    'Content-Length': fileSize,
                    'Content-Type': 'video/mp4',
                });

                fs.createReadStream(filePath).pipe(res);
            }
        } else {
            res.status(404).json({ error: 'Video not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    handleImageRequest: (req, res) => handleMediaRequest(req, res, 'images'),
    handleVideoRequest,
};
