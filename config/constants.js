require('dotenv').config();
module.exports = {
JWT_SECRET: process.env.JWT_SECRET,
EMAIL_SERVICE: process.env.EMAIL_SERVICE,
EMAIL_HOST: process.env.EMAIL_HOST,
EMAIL_USER: process.env.EMAIL_USER,
EMAIL_PASS: process.env.EMAIL_PASS,
AUTH_SECRET_KEY: process.env.AUTH_SECRET_KEY
};
