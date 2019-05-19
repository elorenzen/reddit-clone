const mongoose = require("mongoose");
 
const commentSchema = new mongoose.Schema({
    text: String,
    author: String,
    timeSincePosting: String,
    points: Number,
    replyCount: Number
});
 
module.exports = mongoose.model("Comment", commentSchema);