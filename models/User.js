const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  userType: String,
  email: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model("User", userSchema);
