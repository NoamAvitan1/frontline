const EmailRepository = require("../repository/emailRepository");

class EmailService {
  constructor() {
    this._emailRepository = new EmailRepository();
  }

  sendEmail = async (sender, recipients, subject, body) => {
    return await this._emailRepository.createEmail(
      sender,
      recipients,
      subject,
      body
    );
  };

  saveDraft = async (sender, subject, body) => {
    return await this._emailRepository.createDraft(sender, subject, body);
  };

  getDrafts = async (id) => {
    return await this._emailRepository.getDrafts(id);
  };

  getReceivedEmails = async (id) => {
    return await this._emailRepository.getReceivedEmails(id);
  };

  getSentEmails = async (id) => {
    return await this._emailRepository.getSentEmails(id);
  };
}

module.exports = EmailService;
