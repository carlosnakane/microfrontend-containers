const concat = require('concat');

const files = [
  './dist/app-c/polyfills.js',
  './dist/app-c/runtime.js',
  './dist/app-c/main.js'
];

concat(files, 'dist/index.js');