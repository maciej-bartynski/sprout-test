require('dotenv').config()
const _path = require('path');
const rootDir = _path.join(__dirname, "../../..");
const contract = require(rootDir + '/contract');
const { useWebpackOutput } = contract;
const { js, input, output } = useWebpackOutput

const npmBuild = {
    entry: input + "/" + js.filename,
    output: {
        filename: js.filename,
        publicPath: undefined,
        path: output,
    },
    mode: 'production',
    devtool: undefined,
    devServer: undefined,
};

module.exports = npmBuild;
