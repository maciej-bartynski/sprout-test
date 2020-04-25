import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import { uglify } from 'rollup-plugin-uglify';
import includePaths from 'rollup-plugin-includepaths';
import babel from 'rollup-plugin-babel';
import watch from '@rollup/plugin-run';
import babelrc from './../babel.config';

const plugins = [
    babel(babelrc),
    resolve(),
    commonjs(),
    // uglify(),
    includePaths({ paths: ["./src", "."] }),
    watch(),
];

export default plugins