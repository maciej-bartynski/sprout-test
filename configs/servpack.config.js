const path = require('path');
const fs = require('fs');
const { useBuildspath, usePublicpath, useBackendapi } = require('../sprout-frontend/server');
const { build } = useBuildspath;
const { static, public, documents } = usePublicpath;
const { api } = useBackendapi;

const config = {
    port: 5060,
    domain: "localhost:5060",
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
}

module.exports = config;