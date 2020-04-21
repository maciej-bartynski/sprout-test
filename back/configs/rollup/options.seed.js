import external from './external';
import plugins from './plugins';

export default {
    input: 'src/database/seed/seed.js',
    output: {
        file: 'src/database/seed/__seeder-run-output__/__output__.js',
        format: 'cjs',
    },
    plugins,
    external
}