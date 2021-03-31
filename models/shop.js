
const mongoose = require("mongoose");
const shop = mongoose.Schema({
  id_role: String,
  id_mess: String,
  cost: Number,
  active: Boolean
})
module.exports = mongoose.model("shop", shop)