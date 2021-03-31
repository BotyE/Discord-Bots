
const mongoose = require("mongoose");
const person = mongoose.Schema({
  id_person: String,
  language: String,
  denied_access: Array,
  active_help: Boolean,
  active_being_helped: Boolean,
  last_message: String
})
module.exports = mongoose.model("person", person)