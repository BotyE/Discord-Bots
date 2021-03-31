
const mongoose = require("mongoose");
const stat = mongoose.Schema({
  id: Number,
  time_in_voice: 0,
  messages_count: 0,
  joinDate: Date,
  id_member: String,
  rating: 0,
  rep: 0,
  akr: 0,
  gectar: 0,
  lvl: 0,
  points: 0,
  need_points: 500,
  rub: 0,
  chat_mute: 0,
  voice_mute: 0,
  verebal_warns: 0,
  writen_warns: 0,
  bans: 0,
  connect_time: 0,
  disconnect_time: 0,
  birth: Array
})
module.exports = mongoose.model("stat", stat)