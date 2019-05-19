const express = require('express');
const router = express.Router();

const RedditPost = require('../models/reddit-posts'),
      Comment    = require('../models/comment');


// === INDEX ===
router.get('/reddit-posts/:id/comments/new', isLoggedIn, (req, res) => {
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
router.post('/reddit-posts/:id/comments', isLoggedIn, (req, res) => {
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
                    // Connect comment to Reddit post
                    foundPost.comments.push(comment._id);
                    foundPost.save(); 
                    
                    // Redirect to Reddit post with corresponding ID
                    res.redirect(`/reddit-posts/${foundPost._id}`);
                }
            });
        }
    });
})


// =============================================================================

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;