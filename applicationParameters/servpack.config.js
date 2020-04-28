const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const { useBuildspath, usePublicpath, useBackendapi } = require('../sprout-frontend/server');

const { build } = useBuildspath;
const { static, public, documents } = usePublicpath;
const { api } = useBackendapi;

const usePackages = Object.freeze({
    bodyParser: bodyParser.json(),
    cookieParser: cookieParser(),
    compression: compression()
});

const config = {
    port: 5000,
    domain: "localhost:5000",
    protocol: 'https',
    certification: {
        autogen: false,
        key: fs.readFileSync(path.join(__dirname, '../sprout-backend/cert/key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '../sprout-backend/cert/cert.pem')),
    },
    serv: {
        fallback: [`${build}/index.html`, "*"],
        staticFiles: [
            [`${build}/index.css`, "/index.css"],
            [`${build}/index.js`, "/index.js"],
        ],
        staticFolders: [
            [static, "/static"],
            [public, "/public"],
            [documents, "/docs"],
        ],
        router: api
    },
    middlewares: [
        usePackages.bodyParser,
        usePackages.cookieParser,
        usePackages.compression,
    ],
}

module.exports = config;