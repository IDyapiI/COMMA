const mongoose = require("mongoose");

const exerciceSchema = new mongoose.Schema({
  kind: String,
  question:String,
  responseList : [String],
  response:String,
});

const Exercise = mongoose.model("Exercise", exerciceSchema);

module.exports = Exercise;
