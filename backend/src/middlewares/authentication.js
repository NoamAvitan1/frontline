const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
require('dotenv').config();



const authentication = async (req, res, next) => {
  const errorObject = { message: "unauthorized" };
  console.log("arrivad to authenticate");
  try {
    // checking if the access token is valid
    const accessToken = req.cookies.accessToken;
    const refreshToken  = req.cookies.refreshToken;

    if(accessToken){
        try {
            // checking that the access token is not expired
            const {_id} = jwt.verify(accessToken, process.env.SECRET);
            req._id = _id;
            return next();
        }
        catch {
            //if the access token expired, we need to continue and check if the refresh token is valid
            console.log("checking if refresh token is valid");
        }
    } else {
        throw {...errorObject,type:"accessToken"};
    }

    if(refreshToken) {
       try {
        const {_id} = jwt.verify(refreshToken, process.env.SECRET)
        const user = await User.find({_id,refresh_token:refreshToken})
        req._id = user._id;
        const newRefreshToken = generateToken({ _id}, "60m");
        const newAccessToken = generateToken({ _id}, "15m");
        user.refreshToken = newRefreshToken;
        await user.save();
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            sameSite: "none",
            maxAge: 3600000,
            secure: true,
          });
          res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            sameSite: "none",
            maxAge: 3600000,
            secure: true,
          });
       } catch (error) {
        const {_id} = jwt.decode(refreshToken, process.env.SECRET);
        const user = await User.findByIdAndUpdate({_id},{refresh_token:""});
        throw {...errorObject,type:"RefershToken"};
       }
    }
    else{
        throw {...errorObject,type:"RefershToken"};
    }
  }
  catch (error) {
      console.log({error,function:"authentication"});
      return res.status(401).json(error);
  }
}

module.exports = {authentication};
