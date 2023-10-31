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
  loginSchema: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required(),
  })
};

module.exports = schemasValidations;

/**
 * @swagger
 * components:
 *  schemas:
 *      SchemaSignIn:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              lastname:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *              rol:
 *                  type: string
 */
