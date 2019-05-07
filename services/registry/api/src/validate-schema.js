import Joi from '@hapi/joi';

/**
 *
  const nodeShape = {
    name: 'adm',
    path: 'administrativo',
    title: 'Administrativo'
    children: [
      {
        name: 'compras',
        path: 'compras',
        title: 'Compras'
        assetsUrl: 'http://localhost:18082'
      }
    ]
  }
*/

const schema = Joi.object().keys({
  address: Joi.string(),
  packageJson: Joi.object().keys({
    main: Joi.string(),
    version: Joi.string(),
    name: Joi.string(),
    hercules: Joi.object({
      path: Joi.string(),
      title: Joi.string()
    })
  })
});

const validateSchema = (entry) => {
  return Joi.validate(entry, schema, { presence: 'required' });
}

export default validateSchema;
