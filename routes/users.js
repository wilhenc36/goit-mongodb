const express = require("express");
const controller = require("../controllers/users");

const userRouter = express.Router();

module.exports = () => {
  userRouter.get("/", controller.findUser);
  userRouter.post("/", controller.createUser);
  return userRouter;
};
