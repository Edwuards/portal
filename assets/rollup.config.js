import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import handlebars from 'rollup-plugin-handlebars-plus';

export default {
  input: './src/js/index.js',
  output:{
    file:'./public/js/index.js',
    format: 'iife',
    name:'index',
    globals:{
      'jquery':'$'
    }
  },
  plugins: [
    resolve(),
    commonjs({include: 'node_modules/**'}),
    handlebars()
  ],
  external: ['jquery']
};
