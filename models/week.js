const mongoose = require("mongoose");
const week = mongoose.Schema({
  id: String,
  week: Number,
  year: Number,
  rating: Number,
  time_in_voice: Number,
  message_count: Number,
  activity_wins: Number,
  activity_count: Number,
  reputation_count: Number,
  donate: Number,
  bonus: Number
  
})
module.exports = mongoose.model("week", week)