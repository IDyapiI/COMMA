const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  kind: String,
  question:String,
  responseList : [String],
  response:String,
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
