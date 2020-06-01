import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [{
  input: './src/js/app/user2.js',
  output:{
    file:'./public/js/user2.js',
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
},
{
  input: './src/js/app/user1.js',
  output:{
    file:'./public/js/user1.js',
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
}
];
