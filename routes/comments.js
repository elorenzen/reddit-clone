const express = require('express');
const router = express.Router({mergeParams: true});

const RedditPost = require('../models/reddit-posts'),
      Comment    = require('../models/comment');


// === INDEX ===
router.get('/new', isLoggedIn, (req, res) => {
    // Find Reddit Post by ID
    RedditPost.findById(req.params.id, (err, foundPost) => {
        if(err) {
            console.log(err);
        } else {
            res.render('comments/new', {post: foundPost});
        }
    });
});

// === CREATE ===
router.post('/', isLoggedIn, (req, res) => {
    // Lookup Reddit post using ID
    RedditPost.findById(req.params.id, (err, foundPost) => {
        if(err){
            console.log(err);
            res.redirect('/reddit-posts');
        } else {
            // Create new comment
            Comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    console.log(err);
                } else {
                    // Add username and ID to 'comment'
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
                    // Save comment
                    comment.save();
                    // Connect comment to Reddit post
                    foundPost.comments.push(comment._id);
                    foundPost.save(); 
                    
                    // Redirect to Reddit post with corresponding ID
                    res.redirect(`/reddit-posts/${foundPost._id}`);
                }
            });
        }
    });
});

// === EDIT ===
router.get('/:comment_id/edit', (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err) {
            res.redirect('back');
        } else {
            res.render('comments/edit', {post_id: req.params.id, comment: foundComment});
        }
    })
})


// =============================================================================

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;