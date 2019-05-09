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
        .then(() => initUI());
    });

const initUI = () => {
  setupMenu();
}

const alreadyLoaded = [];

const setupMenu = () => {
  const $menu = document.getElementsByTagName(rootMenuName)[0];
  const routes = parseRoutes();
  $menu.setAttribute('routes', JSON.stringify(routes));
  $menu.addEventListener('routeClick', e => navigate(e.detail));
}

const navigate = (route) => {
  const moduleName = route.replace('/', '');
  changeModule(moduleName);
}

const parseRoutes = () => {
  return Object.keys(utils.moduleLoader.registryDictionary)
    .filter(moduleName => utils.moduleLoader.registryDictionary[moduleName].packageJson.hercules != null)
    .map(moduleName => ({
    name: moduleName,
    path: `/${utils.moduleLoader.registryDictionary[moduleName].packageJson.hercules['path']}`,
    label: utils.moduleLoader.registryDictionary[moduleName].packageJson.hercules['title'],
  }));
}

const changeModule = (name) => {
  const rootContainer = document.getElementById('root-content');
  rootContainer.innerHTML = '';
  if(alreadyLoaded.includes(name)) {
    rootContainer.innerHTML = `<${name}><${name}/>`;
    return;
  }
  utils.moduleLoader.loadModule(name)
    .then(() => {
      alreadyLoaded.push(name);
      rootContainer.innerHTML = `<${name}><${name}/>`;
    });
}