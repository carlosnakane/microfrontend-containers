import scriptLoader from './script-loader';

const moduleLoader = (registryUrl) => {

  let registryDictionary = {};

  function fetchRegistry() {
    return fetch(registryUrl)
      .then(res => res.json())
      .catch(e => console.error('Não foi possível acessar o Registry', e));
  }

  function init() {
    return fetchRegistry('')
      .then(reg => registryDictionary = reg);
  }

  function loadModule(moduleName) {
    return new Promise((resolveLoadModule, rejectLoadModule) => {
      const moduleManifest = registryDictionary[moduleName];
      if(moduleManifest === null) {
        rejectLoadModule(`Módulo ${moduleName} indisponível`);
        return;
      }

      scriptLoader(`${moduleManifest.address}/dist/${moduleManifest.packageJson.main}`)
        .then(() => resolveLoadModule())
        .catch(() => rejectLoadModule());
    });
  }

  return {
    init: (registryUrl) => init(registryUrl),
    loadModule: (moduleName) => loadModule(moduleName)
  };
};

export default moduleLoader;
