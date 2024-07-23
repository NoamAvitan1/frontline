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
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  };

  saveDraft = async (req, res) => {
    const { subject, body, recipients} = req.body;
    if (!subject && !body)
      return res.status(400).json({ message: "You must send body and subject" });
    try {
      const email = await this._emailService.saveDraft(req._id, subject, body, recipients);
      res.status(201).json(email);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  getDrafts = async (req, res) => {
    try {
      const query = req.query.s;
      const email = await this._emailService.getDrafts(req._id, query);
      res.status(201).json(email);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  getReceivedEmails = async (req, res) => {
    try {
      const query = req.query.s;
      const email = await this._emailService.getReceivedEmails(req._id, query);
      res.status(201).json(email);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  getSentEmails = async (req, res) => {
    try {
      const query = req.query.s;
      const email = await this._emailService.getSentEmails(req._id, query);
      res.status(201).json(email);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  updateDraft = async (req, res) => {
    const { id } = req.params;
    if(!id) return res.status(400).json({ message: "id must be provided" });
    const data = req.body;
    console.log(data);
    if (!data.recipients)
      return res.status(400).json({ message: "You must send recipients" });
    try {
      const email = await this._emailService.updateDraft(id, data);
      res.status(206).json(email);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = EmailController;
