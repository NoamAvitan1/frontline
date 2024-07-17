const jwt = require("jsonwebtoken");
require("dotenv").config();


const generateToken = (payload, expires) => {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: expires })
}

module.exports = generateToken;