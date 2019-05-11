const path = require('path');
const staticServer = require('./static-server');
const args = require('minimist')(process.argv.slice(2));

const registryServer = `http://${process.env.REGISTRY_SERVICE_NAME}:${process.env.REGISTRY_INTERNAL_PORT}`;
const staticServerUrl = `${process.env.HOST_PROTOCOL}://${process.env.HOST_IP}:${process.env.EXTERNAL_PORT}`;
const serveFolder = path.resolve(process.cwd(), args.dir);

staticServer(serveFolder, process.env.REGISTRY_INTERNAL_PORT, registryServer, staticServerUrl);
