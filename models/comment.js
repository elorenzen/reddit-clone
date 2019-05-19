const mongoose = require("mongoose");
 
const commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    timeSincePosting: String,
    points: Number,
    replyCount: Number
});
 
module.exports = mongoose.model("Comment", commentSchema);