const emailModel = require("../../../models/emailModel");
const userModel = require("../../../models/userModel");
const UserRepository = require("../../user/repository/userRepository");

class EmailRepository {
  constructor() {
    this._userRepository = new UserRepository();
  }
  createEmail = async (sender, recipients, subject, body) => {
    try {
      const users = await this._userRepository.findUser(recipients);
      if (users.length !== recipients.length) {
        throw new Error("One or more recipient emails do not exist.");
      }
      return await emailModel.create({
        sender,
        recipients,
        subject,
        body,
        status: "sent",
      });
    } catch (error) {
      throw error;
    }
  };

  createDraft = async (sender, subject, body, recipients) => {
    const filter = {
      sender,
      subject,
      body,
    };
    if (recipients) {
      const users = await this._userRepository.findUser(recipients);
      if (users.length !== recipients.length) {
        throw new Error("One or more recipient emails do not exist.");
      }
      filter.recipients = recipients;
    }
    return await emailModel.create(filter);
  };

  getDrafts = async (id, query) => {
    const filter = {};
    filter.sender = id;
    filter.status = "draft";
    if (query) {
      filter.subject = new RegExp(query, "i");
    }
    return await emailModel
      .find(filter)
      .populate({
        path: "sender",
        select: "email first_name last_name",
      })
      .populate({
        path: "recipients",
        select: "email first_name last_name _id",
        model: "User",
        localField: "recipients",
        foreignField: "email",
      });
  };

  getReceivedEmails = async (id, query) => {
    const filter = {};
    filter.status = "sent";
    if (query) {
      filter.subject = new RegExp(query, "i");
    }
    const user = await userModel.findById(id, "email");
    filter.recipients = user.email;
    return await emailModel
      .find(filter)
      .populate({
        path: "sender",
        select: "email first_name last_name",
      })
      .populate({
        path: "recipients",
        select: "email first_name last_name _id",
        model: "User",
        localField: "recipients",
        foreignField: "email",
      });
  };

  getSentEmails = async (id, query) => {
    const filter = {};
    filter.sender = id;
    filter.status = "sent";
    if (query) {
      filter.subject = new RegExp(query, "i");
    }
    return await emailModel
      .find(filter)
      .populate({
        path: "sender",
        select: "email first_name last_name",
      })
      .populate({
        path: "recipients",
        select: "email first_name last_name _id",
        model: "User",
        localField: "recipients",
        foreignField: "email",
      });
  };

  updateDraft = async (id, data) => {
    const users = await this._userRepository.findUser(data.recipients);
    if (users.length !== data.recipients.length) {
      throw new Error("One or more recipient emails do not exist.");
    }
    return await emailModel.findByIdAndUpdate(
      id,
      { ...data, status: "sent" },
      { new: true }
    );
  };
}

module.exports = EmailRepository;
