const request = require("request");
const path = require("path");
const packageJson = require(path.resolve(__dirname, '../package.json'));

const registering = function(registryServer, staticServerUrl, onRegister) {

  const unregister = function(onUnregister) {
    const data = {
      name: packageJson.name
    };
  
    request.delete(registryServer, {
      json: data
    }, onUnregister);
  }

  const props = ['main', 'version', 'name', 'hercules'];
  
  Object
    .keys(packageJson)
    .filter(propName => !props.includes(propName))
    .forEach(propName => delete packageJson[propName]);

  const data = {
    "staticServerUrl": staticServerUrl,
    "packageJson": packageJson
  };

  request.post(registryServer, {
    json: data
  }, (error, _, body) => {
    if (error) {
      onRegister(error);
      return;
    }
    if(body.error !== undefined && body.error !== false) {
      onRegister(body.error.details);
      return;
    }

    onRegister();
  });

  return unregister;

}

module.exports = registering;