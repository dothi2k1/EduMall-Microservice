const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { promises: fsPromises } = fs;

const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
const allowedVideoExtensions = ['.mp4', '.avi', '.mkv'];

const getUploadDir = (fileType) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `uploads/${fileType}/${year}/${month}/${day}/`;
};

const createUploadDir = async (fileType) => {
    const uploadDir = getUploadDir(fileType);
    await fsPromises.mkdir(uploadDir, { recursive: true });
    return uploadDir;
};

const fileFilter = (allowedExtensions) => (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Allowed extensions: ' + allowedExtensions.join(', ')), false);
    }
};

const storage = (fileType, allowedExtensions) => multer.diskStorage({
    destination: async (req, file, cb) => {
        const uploadDir = await createUploadDir(fileType);
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = (fileType, allowedExtensions) => multer({
    storage: storage(fileType, allowedExtensions),
    fileFilter: fileFilter(allowedExtensions),
});

module.exports = { upload, allowedImageExtensions, allowedVideoExtensions };
