const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  topic: String,
  name: String,
  level: String,
  description: String,
  groupeId: [mongoose.Types.ObjectId],
  creator: String,
  exercices: String
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
