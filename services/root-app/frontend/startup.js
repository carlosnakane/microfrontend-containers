const express = require('express');
const path = require('path');
const port = process.env.INTERNAL_PORT|| 8080;
const app = express();
const fs = require('fs');

app.use(express.static(__dirname + '/dist'));

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'dist/index.html'));
});


const envContents = `window.REGISTRY_API = '${process.env.REGISTRY_API}'`;
fs.writeFile(path.resolve(__dirname, 'dist/env.js'), envContents, function(err) {
  if(err) {
    return console.log(err);
  }
  console.log("env.js written");
  
  app.listen(port);
  const staticServerUrl = `${process.env.HOST_PROTOCOL}://${process.env.HOST_IP}:${process.env.EXTERNAL_PORT}`;
  console.log("Root App static server running at " + staticServerUrl);
});