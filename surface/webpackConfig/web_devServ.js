require('dotenv').config()
const path = require('path');

const config = (backend, proto) => {
    return {
        port: process.env.PORT_FRONTEND,
        index: 'index.html',
        publicPath: "/",
        contentBase: path.join(__dirname, '../static'),
        https: proto,
        overlay: true,
        proxy: {
            '/api': {
                target: backend,
                secure: false,
                changeOrigin: true,
            }
        },
        historyApiFallback: {
            disableDotRule: true,
        },
    }
}

module.exports = new Promise((resolve, reject) => {

    const backendHTTPS = process.env.PROXY_BACKEND;
    const backendHTTP = process.env.PROXY_BACKEND_FAILURE;

    const connectionTimeout = setTimeout(() => {
        console.log(`WEBP. Connection timeout. HTTP enforced.`);
        resolve(config(backendHTTP, false));
    }, 30000)

    require('https').get(backendHTTPS, (respo) => {
        
        let data = "";
        
        respo.on('data', (chunk) => {
            data += chunk;
        });

        respo.on("end", () => {
            clearTimeout(connectionTimeout);
            console.log(`WEBP. Connection is good. An asset found during test: ${data.slice(0, 14)}...`)
            resolve(config(backendHTTPS, true));
        });

    }).on("error", (e) => {
        
        clearTimeout(connectionTimeout);
        console.log(`WEBP. Connection failure. HTTP enforced.`, e)
        resolve(config(backendHTTP, false));

    })

})

