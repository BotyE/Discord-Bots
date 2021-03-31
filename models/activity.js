
const mongoose = require("mongoose");
const activity = mongoose.Schema({
  id: String,
  activity_Number: Number,
  Name: String,
  Id_activity: Number,
  mess: String,
  channels_id: Array,
  timestart: String,
  timeend: String,
  games: Number,
  week: Number,
  year: Number,
  day: Number,
  month: Number,
  data: Date,
  gamesmembers: Object
})
module.exports = mongoose.model("activity", activity)