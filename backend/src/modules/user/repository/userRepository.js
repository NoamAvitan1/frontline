const userModel = require("../../../models/userModel")

class UserRepository{

    signup = async (email, password, first_name, last_name) => {
        return await userModel.signup(email, password, first_name, last_name);
    }

    login = async (email, password) => {
        return await userModel.login(email, password);
    }

}


module.exports = UserRepository