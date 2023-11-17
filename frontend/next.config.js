const { parsed: env } = require('dotenv').config();

module.exports = {
  env: env,
  images: {
    domains: ['localhost', 'i.pinimg.com', 'img1.exportersindia.com'],
  },
};
