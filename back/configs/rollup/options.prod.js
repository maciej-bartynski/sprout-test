import external from './external';
import plugins from './plugins';

export default {
    input: 'src/application.js',
    output: {
        file: 'build/build.js',
        format: 'cjs',
    },
    plugins,
    external
}