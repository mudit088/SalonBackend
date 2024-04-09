const mongoose = require('mongoose');

const plm = require("passport-local-mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/slonclone");

const userSchema = mongoose.Schema({
  
    "userId": "user_id",
    "date": "YYYY-MM-DD",
    "slot": {"start": "HH:MM", "end": "HH:MM"}


});

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);