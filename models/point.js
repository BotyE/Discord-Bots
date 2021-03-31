
const mongoose = require("mongoose");
const point = mongoose.Schema({
  id: String,
  week: Number,
  points: Number,
  games: Number
})
module.exports = mongoose.model("point", point)