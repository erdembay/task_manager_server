const Mongoose = require("mongoose");
const AuthSchema = new Mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String },
    activity: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);
module.exports = Mongoose.model("auth", AuthSchema);
