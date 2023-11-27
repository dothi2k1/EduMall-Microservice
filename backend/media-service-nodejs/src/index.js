const express = require('express');
const fileUploadRoutes = require('./routes/fileUploadRoutes');
const mediaRequestController = require('./controller/mediaRequestController');
const galleryController = require('./controller/galleryController');
const videoGalleryController = require('./controller/videoGalleryController');
const checkApiKey = require('./middleware/checkApiKey');
const multer = require('multer');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);



const port = 2000;
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.get('/meeting', (req, res) => {
    res.send('Server is running.');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle WebRTC signaling events here

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.get('/gallery', galleryController);
app.get('/video-gallery', videoGalleryController);

app.get('/', (req, res) => {
    const pageTitle = 'Welcome to CDN';
    res.render('index', { title: pageTitle, domain: process.env.BASE_URL, apikey: process.env.API_KEY });
});

app.use('/upload', fileUploadRoutes);

app.get('/view/:year/:month/:day/:filename', (req, res) => mediaRequestController.handleImageRequest(req, res));
app.get('/view-video/:year/:month/:day/:filename', (req, res) => mediaRequestController.handleVideoRequest(req, res));

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
