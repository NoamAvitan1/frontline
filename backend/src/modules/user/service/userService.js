const UserRepository = require("../repository/userRepository");
const generateToken = require("../../../utils/generateToken");

class UserService {
  constructor() {
    this._userRepository = new UserRepository();
  }

  _setTokensAndCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000, // 15 minutes
      secure: true,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000, // 60 minutes
      secure: true,
    });
  };

  loginUser = async (email, password, res) => {
    try {
      let user = await this._userRepository.login(email, password);
      const refreshToken = generateToken({ _id: user._id }, "60m");
      const accessToken = generateToken({ _id: user._id }, "15m");
      
      // Save refreshToken to user and in the database
      user.refresh_token = refreshToken;
      await user.save();

      // Mask sensitive data before returning user object
      user.password = "******";
      user.refresh_token = "******";

      // Set tokens as cookies in the response
      this._setTokensAndCookies(res, accessToken, refreshToken);

      return user;
    } catch (error) {
      throw error;
    }
  };

  signupUser = async (email, password, first_name, last_name, res) => {
    try {
      let user = await this._userRepository.signup(
        email,
        password,
        first_name,
        last_name
      );
      console.log(user);
      const refreshToken = generateToken({ _id: user._id }, "60m");
      const accessToken = generateToken({ _id: user._id }, "15m");
      
      // Save refreshToken to user and in the database
      user.refresh_token = refreshToken;
      await user.save();

      // Mask sensitive data before returning user object
      user.password = "******";
      user.refresh_token = "******";

      // Set tokens as cookies in the response
      this._setTokensAndCookies(res, accessToken, refreshToken);

      return user;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UserService;
