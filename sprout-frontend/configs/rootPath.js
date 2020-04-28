const path = require('path');
const rootPath = path.join(__dirname, "..");
process.env.PROJECT_ROOT_FOR_WEBPACK = rootPath;
module.exports = rootPath;