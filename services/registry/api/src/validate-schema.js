import Joi from '@hapi/joi';

const schema = Joi.object().keys({
  staticServerUrl: Joi.string().required(),
  packageJson: Joi.object().keys({
    main: Joi.string().required(),
    version: Joi.string().required(),
    name: Joi.string().required(),
    hercules: Joi.object({
      path: Joi.string(),
      title: Joi.string()
    })
  })
});

const validateSchema = (entry) => {
  return Joi.validate(entry, schema);
}

export default validateSchema;
