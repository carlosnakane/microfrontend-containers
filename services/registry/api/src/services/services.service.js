import mock from '../mock/services.db';
import validateSchema from '../validate-schema';

const servicesService = (() => {

  const list = () => {
    return mock.selectAll();
  }
  const checkIfExists = (serviceName) => {
    return list()[serviceName] !== undefined;
  }
  const publish = (service) => {
    const result = validateSchema(service);
    if(result.error !== null) {
      return {
        error: result.error !== null,
        ...result
      };
    }
    mock.insertOrUpdate(service.packageJson.name, service);
    return {
      error: false
    };
  }
  const unpublish = (serviceName) => {
    if(!checkIfExists(serviceName)) {
      return {
        error: true,
        message: `Não há um serviço com o nome ${serviceName} publicado`
      };
    }
    delete mock.delete(serviceName);
    return {
      error: false,
    };
  }

  return {
    publish: (service) => {
      return publish(service);
    },
    unpublish: (serviceName) => {
      return unpublish(serviceName)
    },
    list: () => {
      return list();
    }
  };
})();

export default servicesService;
