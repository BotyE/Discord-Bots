const mongoose = require("mongoose");
const want = mongoose.Schema({
  id: String,
  time: String
})
module.exports = mongoose.model("want", want)