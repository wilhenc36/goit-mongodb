const express = require("express");
const controller = require("../controllers/users");

const userRouter = express.Router();

module.exports = () => {
  userRouter.get("/", controller.findUser);
  userRouter.post("/", controller.createUser);
  userRouter.put("/:id", controller.updateUser);
  userRouter.delete("/:id", controller.deleteUser);
  return userRouter;
};
