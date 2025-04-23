const mongoose = require('mongoose');

const EpassSchema = new mongoose.Schema({
  name: String,
  reason: String,
  date: String,
});

const EpassModel = mongoose.model("Epasses", EpassSchema);
module.exports = EpassModel;
