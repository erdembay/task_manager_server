const Mongoose = require("mongoose");
const MailLogSchema = new Mongoose.Schema(
  {
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
module.exports = Mongoose.model("mail_log", MailLogSchema);
