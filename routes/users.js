const express = require("express");
const controller = require("../controllers/users");
const { ensureAuthenticated } = require("../middlewares/validate-jwt")

const userRouter = express.Router();

module.exports = () => {
  userRouter.get("/", ensureAuthenticated, controller.findUser);
  userRouter.get('/:id', controller.findIdUser);
  userRouter.post("/", controller.createUser);
  userRouter.put("/:id", controller.updateUser);
  userRouter.delete("/:id", controller.deleteUser);
  return userRouter;
};
