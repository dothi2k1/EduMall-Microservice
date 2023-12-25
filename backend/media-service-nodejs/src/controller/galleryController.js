// galleryController.js
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const galleryController = async (req, res) => {
    try {
        // Check if API key is provided in the query parameters
        const enteredApiKey = req.query.apikey;
        const expectedApiKey = process.env.API_KEY;

        if (enteredApiKey !== expectedApiKey) {
            // Incorrect API key, send an unauthorized response
            return res.status(401).json({ error: 'Unauthorized. Invalid API Key.' });
        }

        let year, month, day;

        // Check if year, month, and day are provided in the query parameters
        if (req.query.year && req.query.month && req.query.day) {
            year = req.query.year.toString();
            month = req.query.month.toString().padStart(2, '0');
            day = req.query.day.toString().padStart(2, '0');
        } else {
            // If not provided, use the current date
            const currentDate = new Date();
            year = currentDate.getFullYear().toString();
            month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            day = currentDate.getDate().toString().padStart(2, '0');
        }

        const imageFolderPath = path.join('uploads', 'images', year, month, day);

        try {
            // Read the list of files in the specified date's image folder
            const files = await fs.readdir(imageFolderPath);

            // Filter out non-image files (you may want to improve this filter)
            const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

            // Render the gallery view and pass the list of image files and selected date
            res.render('gallery', { imageFiles, selectedDate: `${year}-${month}-${day}`, domain: process.env.BASE_URL });
        } catch (error) {
            if (error.code === 'ENOENT') {
                res.render('gallery', { imageFiles: [`Không có file`], selectedDate: `${year}-${month}-${day}`, domain: process.env.BASE_URL });
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    } catch (err) {
        console.error('Error in galleryController:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = galleryController;
