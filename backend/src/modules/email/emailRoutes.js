const EmailController = require("./emailController");
const express = require("express");
const { authentication } = require("../../middlewares/authentication");

const emailController = new EmailController();
const router = express.Router();

router.post("/send", authentication, emailController.sendEmail);
router.post("/draft", authentication, emailController.saveDraft);
router.get("/draft", authentication, emailController.getDrafts);
router.get(
  "/inbox",
  authentication,
  emailController.getReceivedEmails
);
router.get("/outbox", authentication, emailController.getSentEmails);
module.exports = router;
