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
router.post('/', isLoggedIn, (req, res) => {
    // Get inputted data from 'new.ejs' form and add to reddit-posts array
    let title = req.body.title;
    let text = req.body.text;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let newPost = {title: title, text: text, author: author};
    // Create new Reddit post and save to DB 
    RedditPost.create(newPost, (err, newlyCreated) => {
        if(err) {
            console.log(err);
        } else {
            // Redirect to 'reddit-posts.ejs' 
            res.redirect('reddit-posts');
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

// === EDIT ===
router.get('/:id/edit', checkPostOwner, (req, res) => {
    RedditPost.findById(req.params.id, (err, foundPost) => {
        res.render('redditpost/edit', {post: foundPost});
    });
});

// === UPDATE ===
router.put('/:id', checkPostOwner, (req, res) => {
    // Find and update correct post
    RedditPost.findByIdAndUpdate(req.params.id, req.body.post, (err, updatedPost) => {
        if (err) {
            console.log(err);
            res.redirect('reddit-posts');
        } else {
            // Redirect to show page
            res.redirect(`/reddit-posts/${req.params.id}`);
        }
    })
});

// === DELETE ===
router.delete('/:id', checkPostOwner, (req, res) => {
    // Find and delete correct post
    RedditPost.findByIdAndDelete(req.params.id, (err) => {
        if(err) {
            console.log(err);
            res.redirect('/reddit-posts');
        } else {
            res.redirect('/reddit-posts');
        }
    });
}); 

// =============================================================================

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

function checkPostOwner(req, res, next) {
    // Check if user is logged in
    if(req.isAuthenticated()) {
        RedditPost.findById(req.params.id, (err, foundPost) => {
            if(err) {
                res.redirect('back');
            } else {
                // If user owns post, allow edits
                if(foundPost.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        })
    // If user isn't logged in, redirect
    } else {
        res.redirect('back');
    }
}

// =============================================================================

module.exports = router;