const javascript = require('./javascript');
const scssModular = require('./scssModular');
const scssNoModular = require('./scssNoModular');

module.exports = [
    javascript,
    scssModular,
    scssNoModular,
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
