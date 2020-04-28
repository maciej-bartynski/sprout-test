require('dotenv').config();
const serverPaths = require('../../../server');

const contentBase = Object.entries(serverPaths.usePublicpath).map(entry => entry[1]);
const assetsBase = serverPaths.useBuildspath.build;

module.exports = {
    port: process.env.PORT_FRONTEND,
    index: 'index.html',
    publicPath: "/",
    contentBase: [...contentBase, assetsBase],
    https: process.env.USE_PROTOCOL === 'https' || false,
    overlay: true,
    proxy: {
        [serverPaths.useBackendapi.api]: {
            target: process.env.USE_BACKEND,
            secure: false,
            changeOrigin: true,
        }
    },
    historyApiFallback: {
        disableDotRule: true,
    },
}
