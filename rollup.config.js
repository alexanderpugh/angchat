import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
//import babel from 'rollup-plugin-babel';

export default {
  input: 'client-app/index.js',
  output: {
    file: 'public/js/index.min.js',
    format: 'iife'
  },
  plugins: [
    resolve(),
    commonJS()
  ]
};
