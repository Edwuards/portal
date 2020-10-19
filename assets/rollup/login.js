import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './src/js/app/login.js',
  output:{
    file:'./public/js/login.js',
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
