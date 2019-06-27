const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  groupId: [ObjectId],
  userId: [ObjectId],
  grade: String,
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
