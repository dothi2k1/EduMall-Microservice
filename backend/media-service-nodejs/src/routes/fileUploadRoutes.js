const express = require('express');
const router = express.Router();
const { upload, allowedImageExtensions, allowedVideoExtensions } = require('../middleware/upload');
const fileUploadController = require('../controller/fileUploadController');
const checkApiKey = require('../middleware/checkApiKey');

router.post('/images', upload('images', allowedImageExtensions).array('images'), [checkApiKey], async (req, res) => {
    try {
        await fileUploadController.handleImageUpload(req, res);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/videos', upload('videos', allowedVideoExtensions).array('videos', 5), [checkApiKey], async (req, res) => {
    await fileUploadController.handleVideoUpload(req, res);
});

module.exports = router;
