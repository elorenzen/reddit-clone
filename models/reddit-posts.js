const mongoose = require('mongoose');

let redditPostSchema = new mongoose.Schema({
    votes: Number,
    title: String,
    post_text: String, 
    subredditName: String,
    author: String,
    commentCount: Number,
    media_url: String,
    image_thumbnail: String,
    image_thumbnail_height: Number,
    image_thumbnail_width: Number,
    post_hint: String,
    video_url: String,
    
    createdDate: Object,
    createdDateYears: Number,
    createdDateMonths: Number,
    createdDateDays: Number,
    createdDateHours: Number,
    createdDateMinutes: Number,
    createdDateSeconds: Number,
    createdDateFormattedTime: String,

    currentDate: Object,
    currentDateYears: Number,
    currentDateMonths: Number,
    currentDateDays: Number,
    currentDateHours: Number,
    currentDateMinutes: Number,
    currentDateSeconds: Number,

    timeSincePosting: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

// Create a model using variable from SCHEMA SETUP
module.exports = mongoose.model('RedditPost', redditPostSchema);
