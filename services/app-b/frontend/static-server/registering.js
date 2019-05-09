const request = require("request");
const path = require("path");
const packageJson = require(path.resolve(__dirname, '../package.json'));

const register = function(registryServer, staticServerUrl, callback) {

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
  }, callback);

}

const unregister = function(registryServer, callback) {
  const data = {
    name: packageJson.name
  };

  request.delete(registryServer, {
    json: data
  }, callback);
}

module.exports = { register, unregister };