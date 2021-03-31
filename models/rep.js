
const mongoose = require("mongoose");
const rep = mongoose.Schema({
  id: String,
  week: Number,
  year: Number,
  rep_id: String
})
module.exports = mongoose.model("rep", rep)