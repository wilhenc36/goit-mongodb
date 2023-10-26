const joi = require("joi");

const schemasValidations = {
  registerSchema: joi.object().keys({
    name: joi.string().max(255).required(),
    lastname: joi.string().max(255).required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$")),
    rol: joi.string().required(),
  }),
};

module.exports = schemasValidations;
