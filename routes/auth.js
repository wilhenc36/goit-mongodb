const express = require("express");
const controller = require("../controllers/auth");
const validateSchemas = require("../middlewares/validate-schemas");
const schemasJoi = require("../schemas");

const authRouter = express.Router();

module.exports = () => {
  authRouter.post(
    "/sign-in",
    validateSchemas(schemasJoi.registerSchema, "body"),
    controller.signIn
  );

  return authRouter;
};
