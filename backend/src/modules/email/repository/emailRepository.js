const emailModel = require("../../../models/emailModel");
const UserRepository = require("../../user/repository/userRepository");


class EmailRepository {

    constructor() {
        this._userRepository = new UserRepository();
    }
    createEmail = async(sender, recipients, subject, body ) => {
        try {
            const senderExist = await this._userRepository.exist(sender);
            if (!senderExist)
                throw new Error("Sender does not exist");
            return await emailModel.create({sender, recipients, subject, body, status: "sent"})
        } catch (error) {
            throw new Error(error.message);
        }
    }

    createDraft = async(sender, subject, body) => {
        return await emailModel.create({sender, subject, body})
    }

    getDrafts = async(id) => {
        return await emailModel.find({sender: id, status: "draft"})
    }

    getReceivedEmails = async(id) => {
        return await emailModel.find({recipients: id, status: "sent"}).populate("sender","email");
    }

    getSentEmails = async(id) => {
        return await emailModel.find({sender: id, status: "sent"}).populate("recipients","email");
    }
}

module.exports = EmailRepository