require('dotenv').config();
const contract = require('../../../contract');
const { usePublicFolders, useBackendApi } = contract;

const contentBase = Object.entries(usePublicFolders).map(entry => {
    const [, value] = entry;
    const { webpackPath } = value;
    return webpackPath;
});

module.exports = {
    port: 3000,
    index: 'index.html',
    publicPath: "/",
    contentBase,
    https: process.env.USE_PROTOCOL === 'https' || false,
    overlay: true,
    proxy: {
        [useBackendApi]: {
            target: process.env.USE_BACKEND,
            secure: false,
            changeOrigin: true,
        }
    },
    historyApiFallback: {
        disableDotRule: true,
    },
}




// const serverPaths = require('../../../server');

// const contentBase = Object.entries(serverPaths.usePublicpath).map(entry => entry[1]);
// const assetsBase = serverPaths.useBuildspath.build;

// module.exports = {
//     port: process.env.PORT_FRONTEND,
//     index: 'index.html',
//     publicPath: "/",
//     contentBase: [...contentBase, assetsBase],
//     contentBasePublicPath: [],
//     https: process.env.USE_PROTOCOL === 'https' || false,
//     overlay: true,
//     proxy: {
//         [serverPaths.useBackendapi.api]: {
//             target: process.env.USE_BACKEND,
//             secure: false,
//             changeOrigin: true,
//         }
//     },
//     historyApiFallback: {
//         disableDotRule: true,
//     },
// }
