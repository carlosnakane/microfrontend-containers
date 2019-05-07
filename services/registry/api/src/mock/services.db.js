const services = (() => {
  const servicesDictionary = {
    'compras': {
      "address": "http://localhost:18083",
      "packageJson": {
        "main": "dist/index.js",
        "version": "1.0.0",
        "name": "compras",
        "hercules": {
          "path": "administrativo/compras",
          "title": "Compras"
        }
      }
    },
    'obz': {
      "address": "http://app-a:18084",
      "packageJson": {
        "main": "dist/index.js",
        "version": "1.0.0",
        "name": "obz",
        "hercules": {
          "path": "administrativo/obz",
          "title": "Orçamento Base Zero"
        }
      }
    }
  };
  const insertOrUpdateRegistry = (serviceName, service) => {
    const inserted = service;
    servicesDictionary[serviceName] = service;
    return inserted;
  }
  const deleteRegistry = (serviceName) => {
    const deleted = servicesDictionary[serviceName]
    delete servicesDictionary[serviceName];
    return deleted;
  }
  return {
    insertOrUpdate: (serviceName, service) => {
      return insertOrUpdateRegistry(serviceName, service);
    },
    delete: (serviceName) => {
      return deleteRegistry(serviceName)
    },
    selectAll: () => {
      return Object.assign({}, servicesDictionary);
    }
  };
})();

export default services;
