var Joi = require('joi');

module.exports = {
  options: { flatten : true },
  body: {
    id: Joi.string().required(),
    name: Joi.string().required(),
    type: Joi.string().required(),
    appelation: {
      name: Joi.string().required(),
      region: Joi.string().required(),
    },
    grapes: Joi.array().items(Joi.string()).required(),
  }
};
