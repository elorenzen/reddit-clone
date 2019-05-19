// ===== AUTHENTICATION ROUTES =====

// Show register form
app.get('/register', (req, res) => {
    res.render('register');
});

// Handles logic to create user
app.post('/register', (req, res) => {
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
app.get('/login', (req, res) => {
    res.render('login');
});

// Handles logic for logging in
app.post('/login', passport.authenticate('local', {
    successRedirect: '/reddit-posts',
    failureRedirect: '/login'
    }), (req, res) => {
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/reddit-posts');
});