const EmailService = require("./service/emailService");

class EmailController {
  constructor() {
    this._emailService = new EmailService();
  }

  sendEmail = async (req, res) => {
    const { sender, recipients, subject, body } = req.body;
    if (!sender || !recipients || !subject || !body)
      return res.status(400).json({ message: "All fields must be filled" });

    try {
      const email = await this._emailService.sendEmail(
        sender,
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
    const { sender, subject, body } = req.body;
    if (!sender || !subject || !body)
      return res.status(400).json({ message: "All fields must be filled" });

    try {
      const email = await this._emailService.saveDraft(sender, subject, body);
      res.status(201).json(email);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  getDrafts = async (req, res) => {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "All fields must be filled" });
    try {
      const email = await this._emailService.getDrafts(id);
      res.status(201).json(email);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  getReceivedEmails = async (req, res) => {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "All fields must be filled" });
    try {
      const email = await this._emailService.getReceivedEmails(id);
      res.status(201).json(email);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  getSentEmails = async (req, res) => {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "All fields must be filled" });
    try {
      const email = await this._emailService.getSentEmails(id);
      res.status(201).json(email);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = EmailController;
