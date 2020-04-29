module.exports = async () => {
    const determineBackend = require('./webpack.options/determineBackend');
    await determineBackend();
    return require('./webpack.options');
};
