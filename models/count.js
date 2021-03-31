const mongoose = require("mongoose");
const count = mongoose.Schema({
  _id: String,
  cnt: Number
})
module.exports = mongoose.model("count", count)