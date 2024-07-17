require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./modules/user/userRoutes");

//import routes

//create an express app
const app = express();

// Use environment variables from .env
const PORT = process.env.PORT || 3003;
const MONGO_URI = process.env.MONGO_URI;

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/user", userRoutes);

//only if connection to db is successful then start the server
connectDB(MONGO_URI)
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
