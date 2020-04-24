import path from "path";

const config = {
    port: 5000,
    domain: "localhost:5000",
    protocol: 'https',
    certification: {
        autogen: false,
        key: path.join(__dirname, '../cert/cert.pem'),
        cert: path.join(__dirname, '../cert/key.pem'),
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
    }
}

export default config;