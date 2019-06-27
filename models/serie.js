const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const seriesSchema = new mongoose.Schema({
  topic: String,
  name: String,
  level: String,
  description: String,
  groupId: [ObjectId],
  creator: ObjectId,
  exercises: []
});

const Serie = mongoose.model("Serie", seriesSchema);

module.exports = Serie;
