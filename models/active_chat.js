
const mongoose = require("mongoose");
const person = mongoose.Schema({
  id_person: String,
  id_helper: String,
  id_guild: String,
  active_help: Boolean,
  active_being_helped: Boolean,
  last_message: String
})
module.exports = mongoose.model("person", person)