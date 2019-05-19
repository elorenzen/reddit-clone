const express = require('express');
const router = express.Router();

const RedditPost = require('../models/reddit-posts');

// === INDEX ===
router.get('/', (req, res) => {
    // Get all Reddit Posts from database
    RedditPost.find({}, (err, allRedditPosts) => {
        if(err) {
            console.log(err);
        } else {
            res.render('redditpost/reddit-posts', {redditPosts: allRedditPosts, currentUser: req.user});
        }
    })
})

// === CREATE ===
router.post('/', (req, res) => {
    // Get inputted data from 'new.ejs' form and add to reddit-posts array
    let title = req.body.title;
    let text = req.body.text;
    let newPost = {title: title, text: text}
    // Create new Reddit post and save to DB 
    RedditPost.create(newPost, (err, newlyCreated) => {
        if(err) {
            console.log(err);
        } else {
            // Redirect to 'reddit-posts.ejs' 
            res.redirect('/');
        }
    })
})

// === NEW ===
router.get('/new', isLoggedIn, (req, res) => {
    res.render('redditpost/new');
})

// === SHOW ===
router.get('/:id', (req, res) => {
    // Find Reddit post with provided ID
    RedditPost.findById(req.params.id).populate('comments').exec((err, foundPost) => {
        if(err) {
            console.log(err);
        } else {
            // Render show template with that Reddit Post
            res.render('redditpost/show', {post: foundPost});
        }
    })
});

// =============================================================================

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;