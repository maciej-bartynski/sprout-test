const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');

// const rootPath = path.resolve(__dirname, "..");
// const frontendPath = path.resolve(rootPath, "sprout-frontend");
// const backendPath = path.resolve(rootPath, "sprout-backend");

const resolveConfig = (rootPath, frontendPath, backendPath) => {
    
    const { usePublicFolders, useWebpackOutput, useBackendApi } = require(path.join(frontendPath, "contract"));
    const { js, css, html, output } = useWebpackOutput;
    const { public, static, docs } = usePublicFolders;

    const usePackages = Object.freeze({
        bodyParser: bodyParser.json(),
        cookieParser: cookieParser(),
        compression: compression()
    });

    return {
        port: 5000,
        domain: "localhost:5000",
        protocol: 'https',
        certification: {
            autogen: false,
            key: fs.readFileSync(path.join(backendPath, 'cert/key.pem')),
            cert: fs.readFileSync(path.join(backendPath, 'cert/cert.pem')),
        },
        serv: {
            fallback: [output + '/' + html.filename, "*"],
            staticFiles: [
                [output + '/' + js.filename, js.serverPath],
                [output + '/' + css.filename, css.serverPath],
            ],
            staticFolders: [
                [static.dir, static.serverPath],
                [public.dir, public.serverPath],
                [docs.dir, docs.serverPath],
            ],
            router: useBackendApi
        },
        middlewares: [
            usePackages.bodyParser,
            usePackages.cookieParser,
            usePackages.compression,
        ],
    }
}

module.exports = resolveConfig;