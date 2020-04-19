export default {
    presets: [
        "@babel/env"
    ],
    plugins: [
        "@babel/plugin-transform-runtime"
    ],
    exclude: 'node_modules/**',
    runtimeHelpers: true
}