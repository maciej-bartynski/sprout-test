export const optionsDev = {
    input: 'configs/rollup.options/runwatch.js',
    output: {
        //file: 'build/watch.js',
        dir: 'build',
        format: 'cjs',
    },
}

export const optionsSeed = {
    input: 'src/database/seed/seed.js',
    output: {
        file: 'src/database/seed/__seeder-run-output__/__output__.js',
        format: 'cjs',
    },
}

export const optionsProd = {
    input: 'src/application.js',
    output: {
        file: 'build/build.js',
        format: 'cjs',
    },
}
