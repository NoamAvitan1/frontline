const UserController = require("./userController");
const express = require("express");
const { authentication } = require("../../middlewares/authentication");

const userController = new UserController();
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/staylogin", authentication, userController.stayLogin);
router.post("/logout", userController.logOut);

module.exports = router;
