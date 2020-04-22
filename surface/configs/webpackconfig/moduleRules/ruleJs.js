const babelConfig = require('../../babel.config.js')

module.exports = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
        presets: babelConfig.presets,
        plugins: babelConfig.plugins,
    }
}