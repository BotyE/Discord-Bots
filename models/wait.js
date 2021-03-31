const mongoose = require("mongoose");
const wait = mongoose.Schema({
  id: String,
  name: String,
  cnt: Number
})
module.exports = mongoose.model("wait", wait)