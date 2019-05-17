const mongoose = require('mongoose');
// Connect to database
mongoose.connect('mongodb://localhost/reddit_clone', {useNewUrlParser: true} /* <-- Removes deprecation warning in terminal */ );
// Import JSON data
const data = require('./reddit-data.json');
console.log(data);

let post_list = data.data.children;
post_list.forEach((post) => {
    let votes = post.data.ups;
    console.log(post);
    console.log(votes);
});
// Import model for RedditPost

// Iterate across each object contained in JSON data list

// For every object in array, use .create() method for every object in the model.