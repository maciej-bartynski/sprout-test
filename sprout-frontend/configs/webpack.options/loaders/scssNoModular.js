const path = require('path');
const CSSWebpackPlugin = require('mini-css-extract-plugin');

module.exports = {
    test: /\.(scss|sass|css)$/,
    include: [
        path.join(__dirname, '../../../src/stylesheets'),
        path.join(__dirname, '../../../src/global.css')
    ],
    use: [
        { loader: CSSWebpackPlugin.loader },
        { loader: 'css-loader' },
        { loader: 'sass-loader' }
    ]
}