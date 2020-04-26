import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import { uglify } from 'rollup-plugin-uglify';
import includePaths from 'rollup-plugin-includepaths';
import babel from 'rollup-plugin-babel';
import watch from '@rollup/plugin-run';
import babelConfig from '../babel.config';

const plugins = [
    babel(babelConfig),
    resolve(),
    commonjs(),
    // uglify(),
    includePaths({ paths: ["./src", "."] }),
    watch(),
];

export default plugins