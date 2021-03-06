const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstname: String,
  lastname: String, 
  email : String,
  password: String,
  status: String,
  groupId: mongoose.Types.ObjectId,
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
