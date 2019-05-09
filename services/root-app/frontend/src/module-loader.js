import axios from 'axios';
import scriptLoader from './script-loader';


class ModuleLoader {

  constructor() {
    this.registryDictionary = {};
    this.registryUrl = '';
  }


  init(registryUrl) {
    this.registryUrl = registryUrl;
    return axios.get(this.registryUrl)
      .then(reg => this.registryDictionary = reg.data)
  }

  loadModule(moduleName) {
    return new Promise((resolveLoadModule, rejectLoadModule) => {
      const moduleManifest = this.registryDictionary[moduleName];
      if(moduleManifest == null) {
        rejectLoadModule(`Módulo ${moduleName} indisponível`);
        return;
      }
  
      scriptLoader(`${moduleManifest.staticServerUrl}/${moduleManifest.packageJson.main}`)
        .then(() => resolveLoadModule())
        .catch(() => rejectLoadModule());
    });
  }
}

const moduleLoaderInstace = new ModuleLoader();

export default moduleLoaderInstace;
