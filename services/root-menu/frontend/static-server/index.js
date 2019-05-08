const express = require('express');
const path = require('path');
const app = express();
const serveIndex = require('serve-index')
const registering = require('./registering');

const distFolder = path.join(__dirname, '../dist');

app.use(serveIndex(distFolder));
app.use(express.static(distFolder));

app.listen(process.env.INTERNAL_PORT, function() {
  console.info('Http server on');

  const registryServer = `http://${process.env.REGISTRY_SERVICE_NAME}:${process.env.REGISTRY_INTERNAL_PORT}`;
  const staticServerUrl = `${process.env.HOST_PROTOCOL}://${process.env.HOST_IP}:${process.env.EXTERNAL_PORT}`;

  registering.register(registryServer, staticServerUrl, (error, res, body) => {
    if (error) {
      console.error(error)
      return;
    }
    if(body.error !== undefined && body.error !== false) {
      console.log('Error while trying to register on Registry Server');
      console.log(body.error.details);
      return;
    }

    console.log(`Registered on Registry Server through the url ${staticServerUrl}`);

    Object.keys({'SIGHUP': 1, 'SIGINT': 2, 'SIGTERM': 15 })
    .forEach(function (signal) {
      process.on(signal, function () {
        console.log(`Signal ${signal} received. Unregistering from Registry Server`);
        registering.unregister(registryServer, function() {
          console.log(`Unregistered`);
        });
      });
    });

  });
});