const args = require('minimist')(process.argv.slice(2));
const express = require('express');
const path = require('path');
const app = express();
const serveIndex = require('serve-index');

const serve = (folder, port, callback) => {
  app.use(serveIndex(folder));
  app.use(express.static(folder));
  
  app.listen(port, callback);
}

module.exports = serve;

