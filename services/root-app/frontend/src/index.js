import "./polyfills";
import moduleLoader from './module-loader';
import env from './env';

const utils = {
  moduleLoader: moduleLoader,
  registryApiUrl: env.REGISTRY_API
}

const rootMenuName = 'root-menu';

window.utils = utils;

utils
  .moduleLoader
    .init(env.REGISTRY_API)
    .then(() => {
      utils.moduleLoader.loadModule(rootMenuName)
        .then(() => setupMenu());
    });

const setupMenu = () => {
  const $menu = document.getElementsByTagName(rootMenuName)[0];

  const items = Object.keys(utils.moduleLoader.registryDictionary)
    .filter(moduleName => utils.moduleLoader.registryDictionary[moduleName].packageJson.hercules != null)
    .map(moduleName => ({
    name: moduleName,
    path: utils.moduleLoader.registryDictionary[moduleName].packageJson.hercules['path'],
    label: utils.moduleLoader.registryDictionary[moduleName].packageJson.hercules['title'],
  }));
  
  $menu.setAttribute('items-list', JSON.stringify(items));
}