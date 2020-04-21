import external from './external';
import plugins from './plugins';

export default {
    input: 'configs/rollup/runwatch.js',
    output: {
        file: 'build/watch.js',
        format: 'cjs',
    },
    plugins,
    external
}