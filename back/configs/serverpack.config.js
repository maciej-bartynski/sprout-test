import path from "path";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import fs from 'fs'

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
        key: fs.readFileSync(path.join(__dirname, '../cert/key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '../cert/cert.pem')),
    },
    serv: {
        fallback: ["path-to-build-html", "*"],
        staticFiles: [
            ["path-to-build-css", "/stylesheet.css"],
            ["path-to-build-js", "/script.js"],
        ],
        staticFolders: [
            ["path-to-folder", "/folder/adress"],
            ["path-to-folder", "/folder/adress"],
            ["path-to-folder", "/folder/adress"],
        ],
        router: ""
    },
    middlewares: [
        usePackages.bodyParser,
        usePackages.cookieParser,
        usePackages.compression,
    ]
}

export default config;