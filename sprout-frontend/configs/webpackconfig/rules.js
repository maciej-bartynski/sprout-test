const ruleJs = require('./moduleRules/ruleJs');
const ruleCss = require('./moduleRules/ruleCss');
const ruleCssExcluded = require('./moduleRules/ruleCssExcluded');

module.exports = [
    ruleJs,
    ruleCss,
    ruleCssExcluded,
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
