const EmailService = require("./service/emailService");

class EmailController {
  constructor() {
    this._emailService = new EmailService();
  }

  sendEmail = async (req, res) => {
    const { recipients, subject, body } = req.body;
    if (!recipients || !subject || !body)
      return res.status(400).json({ message: "All fields must be filled" });

    try {
      const email = await this._emailService.sendEmail(
        req._id,
        recipients,
        subject,
        body
      );
      res.status(201).json(email);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  saveDraft = async (req, res) => {
    const {  subject, body } = req.body;
    if (!subject || !body)
      return res.status(400).json({ message: "All fields must be filled" });

    try {
      const email = await this._emailService.saveDraft(req._id, subject, body);
      res.status(201).json(email);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  getDrafts = async (req, res) => {
    try {
      const email = await this._emailService.getDrafts(req._id);
      res.status(201).json(email);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  getReceivedEmails = async (req, res) => {
    try {
      const email = await this._emailService.getReceivedEmails(req._id);
      res.status(201).json(email);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  getSentEmails = async (req, res) => {
    try {
      const email = await this._emailService.getSentEmails(req._id);
      res.status(201).json(email);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = EmailController;
