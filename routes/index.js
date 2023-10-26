const express = require("express");
const routerUser = require("./users");
const routerAuth = require("./auth");

const routerIndex = express.Router();

module.exports = () => {
  routerIndex.use("/auth", routerAuth());
  routerIndex.use("/users", routerUser());

  return routerIndex;
};
