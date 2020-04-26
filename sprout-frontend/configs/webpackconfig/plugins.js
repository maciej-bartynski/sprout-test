const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CSSWebpackPlugin = require('mini-css-extract-plugin');

module.exports = [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, '../../src/templates/index.html'),
        inject: false,
    }),
    new CleanWebpackPlugin(),
    new CSSWebpackPlugin({
        template: path.join(__dirname, '../../src/templates/index.css'),
        filename: 'index.css',
    })
]