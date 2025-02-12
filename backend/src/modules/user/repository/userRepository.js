const userModel = require("../../../models/userModel")

class UserRepository{

    signup = async (email, password, first_name, last_name) => {
        return await userModel.signup(email, password, first_name, last_name);
    }

    login = async (email, password) => {
        return await userModel.login(email, password);
    }

    exist = async(id) => {
        return await userModel.exists(id)
    }

    stayLogin = async(id) => {
        return await userModel.findById(id)
    }

    findUser = async(recipients) => {
        return await userModel.find({email: {$in: recipients}})
    }
}


module.exports = UserRepository