const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Add passport-local-mongoose packages to User
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);