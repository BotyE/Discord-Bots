const mongoose = require("mongoose");
const timerole = mongoose.Schema({
    id: String,
  id_role: String,
  time_end: String
})
module.exports = mongoose.model("timerole", timerole)