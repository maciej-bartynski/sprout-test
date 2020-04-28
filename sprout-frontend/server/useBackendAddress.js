const { config } = require('dotenv');
config();
exports.useBackendAddress = Object.freeze({
    backendHttp: process.env.BACKEND_HTTP,
    backendHttps: process.env.BACKEND_HTTPS
})
