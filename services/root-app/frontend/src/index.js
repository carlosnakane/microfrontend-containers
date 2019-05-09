import "./polyfills";
import moduleLoader from './module-loader';

const utils = {
  moduleLoader: moduleLoader,
  registryApiUrl: window.REGISTRY_API
}

const rootMenuName = 'root-menu';

utils
  .moduleLoader
    .init(utils.registryApiUrl)
    .then(() => {
      utils.moduleLoader.loadModule(rootMenuName)
        .then(() => initUI());
    });

const initUI = () => {
  setupMenu();
  setupRoute();
}

const setupMenu = () => {
  const $menu = document.getElementsByTagName(rootMenuName)[0];
  const routes = parseRoutes();
  $menu.setAttribute('routes', JSON.stringify(routes));
  $menu.addEventListener('routeClick', e => navigate(e.detail));
}

const setupRoute = () => {
  if(window.location.pathname.length > 1) {
    changeModule(window.location.pathname.replace('/', ''));
  }
}

const navigate = (route) => {
  const moduleName = route.replace('/', '');
  history.pushState(null, null, route);
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

const alreadyLoaded = [];

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