const request = require("request");
const path = require("path");

const register = function(registryApiUri, staticServerUrl, callback) {

  const props = ['main', 'version', 'name', 'hercules'];
  const packageJson = require(path.resolve(__dirname, '../package.json'));

  Object
    .keys(packageJson)
    .filter(propName => !props.includes(propName))
    .forEach(propName => delete packageJson[propName]);

  const data = {
    "staticServerUrl": staticServerUrl,
    "packageJson": packageJson
  };

  request.post(registryApiUri, {
    json: data
  }, callback);

}

module.exports = register;