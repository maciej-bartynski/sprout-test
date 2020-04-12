require('dotenv').config()
const path = require('path');
const CSSWebpackPlugin = require('mini-css-extract-plugin');

module.exports = {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.(scss|sass|css)$/,
            include: [
                path.join(__dirname, '../src/Components'),
                path.join(__dirname, '../src/RouteComponents'),
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
        },
        {
            test: /\.(scss|sass|css)$/,
            include: [
                path.join(__dirname, '../src/stylesheets'),
                path.join(__dirname, '../src/global.css')
            ],
            use: [
                { loader: CSSWebpackPlugin.loader },
                { loader: 'css-loader' },
                { loader: 'sass-loader' }
            ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader',
                {
                    loader: 'image-webpack-loader'
                }
            ]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader'
            ]
        },
        {
            test: /\.(csv|tsv)$/,
            use: [
                'csv-loader'
            ]
        },
        {
            test: /\.xml$/,
            use: [
                'xml-loader'
            ]
        }
    ]
}