const EmailController = require("./emailController");
const express = require("express");
const { authentication } = require("../../middlewares/authentication");

const emailController = new EmailController();
const router = express.Router();

router.post("/send", authentication, emailController.sendEmail);
router.post("/save-draft", authentication, emailController.saveDraft);
router.get("/get-drafts", authentication, emailController.getDrafts);
router.get(
  "/get-received-emails",
  authentication,
  emailController.getReceivedEmails
);
router.get("/get-sent-emails", authentication, emailController.getSentEmails);
module.exports = router;
