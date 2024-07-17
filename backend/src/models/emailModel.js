const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipients: [
      { type:String, required: false },
    ],
    subject: { type: String, required: true },
    body: { type: String, required: true },
    status: { type: String, enum: ["sent", "draft"], default: "draft" },
  },
  { timestamps: true }
);

const Email = mongoose.model("Email", EmailSchema);

module.exports = Email;
