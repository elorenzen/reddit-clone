const mongoose = require('mongoose');
// Connect to database
mongoose.connect('mongodb://localhost/reddit_clone', {useNewUrlParser: true} /* <-- Removes deprecation warning in terminal */ );
// Import JSON data
const data = require('./reddit-data.json');
console.log(data);

let post_list = data.data.children;
post_list.forEach((post) => {
    let votes = post.data.ups;

    console.log(votes);

    let title = post.data.title;
    console.log(title);
    let post_text = post.data.selftext;
    console.log(post_text);
    let subredditName = post.data.subreddit_name_prefixed;
    console.log(subredditName);
    let username = post.author;
    let commentCount = post.num_comments;
    let media_url = post.url;
    let image_thumbnail = post.thumbnail;
    let image_thumbnail_height = post.thumbnail_height;
    let image_thumbnail_width = post.thumbnail_width;
    let post_hint = post.post_hint;
    let video_url = post.media;

                let createdDate = new Date(post.created_utc * 1000);
                let createdDateYears = createdDate.getFullYear();
                let createdDateMonths = createdDate.getMonth();
                let createdDateDays = createdDate.getDay();
                let createdDateHours = createdDate.getHours();
                let createdDateMinutes = '0' + createdDate.getMinutes();
                let createdDateSeconds = '0' + createdDate.getSeconds();
                let createdDateFormattedTime = createdDateHours + ':' + createdDateMinutes + ':' + createdDateSeconds;

                let currentDate = new Date();
                let currentDateYears = currentDate.getFullYear();
                let currentDateMonths = currentDate.getMonth();
                let currentDateDays = currentDate.getDay();
                let currentDateHours = currentDate.getHours();
                let currentDateMinutes = currentDate.getMinutes();
                let currentDateSeconds = currentDate.getSeconds();

                let timeSincePosting;

                if ((currentDateYears - createdDateYears) > 0) {
                    if ((currentDateYears - createdDateYears) === 1) {
                        timeSincePosting = (currentDateYears - createdDateYears) + ' year ago';
                    }
                    else {
                        timeSincePosting = (currentDateYears - createdDateYears) + ' years ago';
                    }
                }

                else if ((currentDateMonths - createdDateMonths) > 0) {
                    timeSincePosting = (currentDateMonths - createdDateMonths) + 'months ago';
                }

                else if ((currentDateDays - createdDateDays) > 0) {
                    if ((currentDateDays - createdDateDays) === 1) {
                        timeSincePosting = (currentDateDays - createdDateDays) + ' day ago';
                    }
                    else {
                        timeSincePosting = (currentDateDays - createdDateDays) + ' days ago';
                    }
                }

                else if ((currentDateHours - createdDateHours) > 0) {
                    if ((currentDateHours - createdDateHours) === 1) {
                        timeSincePosting = (currentDateHours - createdDateHours) + ' hour ago';
                    }
                    else {
                        timeSincePosting = (currentDateHours - createdDateHours) + ' hours ago';
                    }
                }

                else if ((currentDateMinutes - createdDateMinutes) > 0) {
                    if ((currentDateMinutes - createdDateMinutes) === 1) {
                        timeSincePosting = (currentDateMinutes - createdDateMinutes) + ' minute ago';
                    }
                    else {
                        timeSincePosting = (currentDateMinutes - createdDateMinutes) + ' minutes ago';
                    }
                }

                else if ((currentDateSeconds - createdDateSeconds) > 0) {
                    if ((currentDateSeconds - createdDateSeconds) === 1) {
                        timeSincePosting = (currentDateSeconds - createdDateSeconds) + ' second ago';
                    }
                    else {
                        timeSincePosting = (currentDateSeconds - createdDateSeconds) + ' seconds ago';
                    }
                }

    
});
// Import model for RedditPost

// Iterate across each object contained in JSON data list

// For every object in array, use .create() method for every object in the model.