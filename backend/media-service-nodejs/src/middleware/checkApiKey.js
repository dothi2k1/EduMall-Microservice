require('dotenv').config();
const checkApiKey = (req, res, next) => {
    const apikey = req.body.apikey;
    if (apikey === process.env.API_KEY) {
        next();
    } else {

        res.status(401).json({ error: 'Unauthorized. Invalid Api Key' });
    }
};

module.exports = checkApiKey;
