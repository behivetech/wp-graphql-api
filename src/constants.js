require('dotenv').config({path: '.env.development'});

const BASE_URL = process.env.BASE_URL;
const WP_ACCESS_TOKEN = process.env.WP_ACCESS_TOKEN;

module.exports = {
    BASE_URL,
    WP_ACCESS_TOKEN,
};
