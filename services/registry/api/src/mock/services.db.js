const services = (() => {
  const servicesDictionary = {};
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
