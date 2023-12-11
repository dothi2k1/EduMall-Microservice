// Import Axios library
const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000'
});
axiosInstance.interceptors.request.use(
  function (config) {
    let token;
    if (localStorage.getItem('token')) token = JSON.parse(localStorage.getItem('token')).token;
    config.headers = { authorization: `Bearer ${token}` };
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);
export default axiosInstance;
