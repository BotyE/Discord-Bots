const mongoose = require("mongoose");
const form = mongoose.Schema({
  name: String,
  cnt: Number,
  question: Array,
  access: Array,
  num: Number,
  active: Boolean,
  answer: String
})
module.exports = mongoose.model("form", form)