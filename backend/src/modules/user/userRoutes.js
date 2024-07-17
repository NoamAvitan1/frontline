const UserController = require("./userController");
const express = require("express");
const {authentication} = require("../../middlewares/authentication")

const userController = new UserController();
const route = express.Router();

route.post("/signup", userController.signup);
route.post("/login",userController.login);

module.exports = route;