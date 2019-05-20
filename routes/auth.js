const passport = require('passport'),
      express  = require('express'),
      router   = express.Router();

const User = require('../models/user');

// ===== ROOT ROUTE =====
/*
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
*/
// =============================================================================

// ===== AUTHENTICATION ROUTES =====

// Show register form
router.get('/register', (req, res) => {
    res.render('register');
});

// Handles logic to create user
router.post('/register', (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect('/reddit-posts');
        });
    });
});

// Show login form
router.get('/login', (req, res) => {
    res.render('login');
});

// Handles logic for logging in
router.post('/login', passport.authenticate('local', {
    successRedirect: '/reddit-posts',
    failureRedirect: '/login'
    }), (req, res) => {
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/reddit-posts');
});


// =============================================================================

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;