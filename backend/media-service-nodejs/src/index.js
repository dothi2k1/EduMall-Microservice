const express = require('express');
const fileUploadRoutes = require('./routes/fileUploadRoutes');
const mediaRequestController = require('./controller/mediaRequestController');
const multer = require('multer');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
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


app.get('/', (req, res) => {
    const pageTitle = 'Welcome to CDN';
    res.render('index', { title: pageTitle, domain: process.env.BASE_URL });
});

app.use('/upload', fileUploadRoutes);

app.get('/view/:year/:month/:day/:filename', (req, res) => mediaRequestController.handleImageRequest(req, res));
app.get('/view-video/:year/:month/:day/:filename', (req, res) => mediaRequestController.handleVideoRequest(req, res));

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
