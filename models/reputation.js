const mongoose = require("mongoose");
const rep = mongoose.Schema({
  id: Number,
  week: Number,
  count: Number,
  
})
module.exports = mongoose.model("rep", rep)