import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './src/js/app.js',
  output:{
    file:'./public/js/app.js',
    format: 'iife',
    name:'index',
    globals:{
      'jquery':'$'
    }
  },
  plugins: [
    resolve(),
    commonjs({include: 'node_modules/**'}),
  ],
  external: ['jquery']
};
