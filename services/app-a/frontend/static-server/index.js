const path = require('path');
const serve = require('./serve');
const shutdownListener = require('./shutdown-signals-listener');
const register = require(path.resolve(__dirname, './register'));

const staticServer = (serveFolder, servePort, registryServer, staticServerUrl) => {

  let insRegistered = false;
  
  const onServe = () => {
    const unregister = register(registryServer, staticServerUrl, (error) => {
      
      if(error != null) {
        console.log('Could not register');
        console.log(error);
        return;
      }
  
      insRegistered = true;
      console.log(`HTTP server registered as ${staticServerUrl}`);
    });
  
    shutdownListener(process, signal => {
      if(insRegistered) {
        console.log(`Signal ${signal} received. Unregistering from Registry Server`);
        unregister(() => {
          console.log(`Unregistered`);
        });
      }
    });
  }

  serve(serveFolder, servePort, onServe);
};

module.exports = staticServer;
