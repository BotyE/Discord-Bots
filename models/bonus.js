
const mongoose = require("mongoose");
const bonus = mongoose.Schema({
  id: String,
  time_in_voice: String,
  bonus_code: String,
  bonus_active: String,
  bonus_DateAt: String,
  activate_bonus: Boolean,
  bonus_end: Boolean,
  count_activates: Number
})
module.exports = mongoose.model("bonus", bonus)