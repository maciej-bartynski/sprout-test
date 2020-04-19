import external from './external';
import plugins from './plugins';

export default {
    input: 'src/index.js',
    output: {
        file: 'build/build.js',
        format: 'cjs',
    },
    plugins,
    external
}