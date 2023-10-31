const express = require("express");
const controller = require("../controllers/auth");
const validateSchemas = require("../middlewares/validate-schemas");
const schemasJoi = require("../schemas");

const authRouter = express.Router();

module.exports = () => {
  /**
   * @swagger
   * /api/auth/sign-in/:
   *  post:
   *      requestBody:
   *        required: true
   *        content:
   *            application/json:
   *                schema:
   *                  $ref: '#/components/schemas/SchemaSignIn'
   *      tags:
   *          - Auth
   *      description: Register a new user in the App.
   *      responses:
   *          200:
   *              description: Success.
   *          400:
   *              description: Bad request
   */
  authRouter.post(
    "/sign-in",
    validateSchemas(schemasJoi.registerSchema, "body"),
    controller.signIn
  );

  authRouter.post("/log-in", validateSchemas(schemasJoi.loginSchema, "body"), controller.login)

  return authRouter;
};
