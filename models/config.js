
const mongoose = require("mongoose");
const config = mongoose.Schema({
  guild_name: String,
  id_guild: String,
  language: String,
  denied_access: Array,
  prefix: String,
  full_access: Array,
  voice_category: String,
  voice_create_channel: String,
  stats_channel:String,
  paid_for_time: String

})
module.exports = mongoose.model("config", config)