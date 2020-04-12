require('dotenv').config()
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CSSWebpackPlugin = require('mini-css-extract-plugin');

module.exports = [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, '../../index.html'),
        inject: false,
    }),
    new CleanWebpackPlugin(),
    new CSSWebpackPlugin({
        template: path.join(__dirname, '../src/global.css'),
        filename: 'index.css',
    })
]