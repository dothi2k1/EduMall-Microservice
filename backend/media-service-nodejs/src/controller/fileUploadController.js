const handleFileUpload = async (req, res, fileType, urlPrefix) => {
    try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');

        const baseUrl = process.env.BASE_URL || 'https://www.facebook.com/dothi0810/';

        const files = req.files.map(file => ({
            filename: file.filename,
            [`${fileType}Url`]: `${baseUrl}/${urlPrefix}/${year}/${month}/${day}/${file.filename}`,
        }));

        res.json({ files });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const handleImageUpload = async (req, res) => {
    await handleFileUpload(req, res, 'image', 'view');
};

const handleVideoUpload = async (req, res) => {
    await handleFileUpload(req, res, 'video', 'view-video');
};

module.exports = {
    handleImageUpload,
    handleVideoUpload,
};
