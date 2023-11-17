// Import Axios library
const axios = require('axios');

const api = axios.create({
    baseURL: process.env.NEXT_DOMAIN, // Replace this with your API base URL
});

export default api;