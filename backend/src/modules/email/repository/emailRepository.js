const emailModel = require("../../../models/emailModel");
const userModel = require("../../../models/userModel");
const UserRepository = require("../../user/repository/userRepository");

class EmailRepository {
  constructor() {
    this._userRepository = new UserRepository();
  }
  createEmail = async (sender, recipients, subject, body) => {
    try {
      const users = await userModel.find({ email: { $in: recipients } });
      console.log(users);
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

  createDraft = async (sender, subject, body) => {
    return await emailModel.create({ sender, subject, body });
  };

  getDrafts = async (id) => {
    return await emailModel
      .find({ sender: id, status: "draft" })
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

  getReceivedEmails = async (id) => {
    return await emailModel
      .find({ recipients: id, status: "sent" })
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

  getSentEmails = async (id) => {
    return await emailModel
      .find({ sender: id, status: "sent" })
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
}

module.exports = EmailRepository;
