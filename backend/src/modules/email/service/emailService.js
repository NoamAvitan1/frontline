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

  saveDraft = async (sender, subject, body, recipients) => {
    return await this._emailRepository.createDraft(sender, subject, body, recipients);
  };

  getDrafts = async (id, query) => {
    return await this._emailRepository.getDrafts(id, query);
  };

  getReceivedEmails = async (id, query) => {
    return await this._emailRepository.getReceivedEmails(id, query);
  };

  getSentEmails = async (id, query) => {
    return await this._emailRepository.getSentEmails(id, query);
  };

  updateDraft = async (id, data) => {
    return await this._emailRepository.updateDraft(id, data);
  };
}

module.exports = EmailService;
