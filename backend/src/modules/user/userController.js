const UserService = require("./service/userService");

class UserController {
  constructor() {
    this._userService = new UserService();
  }

  signup = async (req, res) => {
    const { email, password, first_name, last_name } = req.body;
    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({ message: "All fields must be filled" });
    }
    try {
      const user = await this._userService.signupUser(
        email,
        password,
        first_name,
        last_name,
        res
      );
      res.status(201).json(user);
    } catch (error) {
      if (
        error.message === "Email already in use" ||
        error.message === "Email is not valid"
      ) {
        return res
          .status(409)
          .json({ message: "Account creation failed due to a conflict" });
      }
      return res.status(400).json({ message: error.message });
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields must be filled" });
    }
    try {
      const user = await this._userService.loginUser(email, password, res);
      res.status(200).json(user);
    } catch (error) {
      if (
        error.message === "Incorrect email" ||
        error.message === "Incorrect password"
      ) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Incorrect email or password" });
      }
      return res.status(400).json({ message: error.message });
    }
  };
}

module.exports = UserController;
