
const mongoose = require("mongoose");
const activity_game = mongoose.Schema({
  id: Number,
  Name: String,
  id_manager: String,
  Number_game: Number,
  members: Array,
  Winner: Array,
  timestart: String,
  timeend: String
})
module.exports = mongoose.model("activity_game", activity_game)