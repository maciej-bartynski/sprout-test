const path = require("path");

const contract = Object.freeze({
    /**
     * Paths and directories used by 
     * webpack AND express server
     * to find and serve content during
     * development AND production runtime.
     */
    usePublicFolders: Object.freeze({
        public: {
            dir: path.join(__dirname, '../pub/public'),
            serverPath: "/public",
            webpackPath: path.join(__dirname, '../pub'),
        },
        static: {
            dir: path.join(__dirname, '../pub/static'),
            serverPath: "/static",
            webpackPath: path.join(__dirname, '../pub'),
        },
        docs: {
            dir: path.join(__dirname, '../pub/docs'),
            serverPath: "/docs",
            webpackPath: path.join(__dirname, '../pub'),
        }
    }),
    useWebpackOutput: Object.freeze({
        output: path.join(__dirname, '../build'),
        input: path.join(__dirname, '../src/templates'),
        js: {
            filename: 'index.js',
            serverPath: '/index.js',
        },
        css: {
            filename: 'index.css',
            serverPath: '/index.css',
        },
        html: {
            filename: 'index.html',
            serverPath: '/index.html',
        },
    }),
    useBackendApi: "/api",
    useBackendUrl: {
        http: "http://localhost:5000/api",
        https: "https://localhost:5000/api",
    },
});

module.exports = contract;