
const mongoose = require("mongoose");
const active = mongoose.Schema({
    activityname: String,
    active: Boolean,
    activityrule: String,
    name: String,
    picture: String,
    voice: Number,
    limit: Number
})
module.exports = mongoose.model("active", active)