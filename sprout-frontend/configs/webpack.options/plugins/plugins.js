const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CSSWebpackPlugin = require('mini-css-extract-plugin');
const rootDir = path.join(__dirname, "../../..");
const contract = require(rootDir + '/contract');
const { useWebpackOutput } = contract;
const { css, html, input } = useWebpackOutput

module.exports = [
    new HtmlWebpackPlugin({
        template: input + '/' + html.filename,
        inject: false,
    }),
    new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false
    }),
    new CSSWebpackPlugin({
        template: input + '/' + css.filename,
        filename: css.filename,
    })
]