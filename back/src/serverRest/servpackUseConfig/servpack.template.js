const configTemplate = {
    port: 5000,
    domain: "localhost:5000",
    protocol: 'http',
    certification: {
        autogen: false,
        key: "",
        cert: "",
    },
    serv: {
        fallback: ["./build/index.html", "*"],
        staticFiles: [
            ["./build/stylesheet.css", "/stylesheet.css"],
            ["./build/script.js", "/script.js"],
        ],
        staticFolders: [
            ["./pub/public", "/public"],
            ["./pub/static", "/static"],
            ["./pub/documents", "/doc"],
        ],
        router: "/api"
    }
}

export default configTemplate