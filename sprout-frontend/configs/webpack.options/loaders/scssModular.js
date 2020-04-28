const path = require('path');
const CSSWebpackPlugin = require('mini-css-extract-plugin');

module.exports = {
    test: /\.(scss|sass|css)$/,
    include: [
        path.join(__dirname, '../../../src/Components'),
        path.join(__dirname, '../../../src/RouteComponents'),
    ],
    use: [
        { loader: CSSWebpackPlugin.loader },
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
                modules: {
                    localIdentName: "[name]-[local]-[hash:base64:5]"
                }
            }
        },
        { loader: 'sass-loader' }
    ]
}