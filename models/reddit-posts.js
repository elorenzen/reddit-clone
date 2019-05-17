const mongoose = require('mongoose');

let redditPostSchema = new mongoose.Schema({
    title: String,
    upvotes: Number,
    author: String,
    subredditName: String,
    text: String,
    commentCount: Number,
    image_url: String,
    video_url: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

// Create a model using variable from SCHEMA SETUP
module.exports = mongoose.model('RedditPost', redditPostSchema);
