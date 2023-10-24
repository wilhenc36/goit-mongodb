const express = require("express");
const routerUser = require("./users");

const routerIndex = express.Router();

module.exports = () => {
  routerIndex.use("/users", routerUser());

  return routerIndex;
};
