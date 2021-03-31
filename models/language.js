const mongoose = require("mongoose");
const language = mongoose.Schema({
  name: String,
  name_id: String,
  days: Array


})
module.exports = mongoose.model("language", language)