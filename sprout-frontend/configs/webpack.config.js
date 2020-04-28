
require('./rootPath.js');
const determineBackend = require('./webpack.options/determineBackend');

module.exports = async () => {
    await determineBackend();
    return require('./webpack.options');
};
