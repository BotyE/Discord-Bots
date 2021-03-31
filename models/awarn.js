
const mongoose = require("mongoose");
const awarn = mongoose.Schema({
  id: String,
  Count: Number,
  log: Array
  
})
module.exports = mongoose.model("awarn", awarn)