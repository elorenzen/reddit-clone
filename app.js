const LocalStrategy = require('passport-local'),
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      passport      = require('passport'),
      express       = require('express'),
      session       = require('express-session'),
      port          = process.env.PORT || 3000,
      app           = express(),
      //MODELS
      RedditPost = require('./models/reddit-posts'),
      Comment    = require('./models/comment'),
      User       = require('./models/user'),
      // Imported JSON data
      data = require('./reddit-data.json');


// Connect to database
mongoose.connect('mongodb://localhost/reddit_clone', {useNewUrlParser: true} /* <-- Removes deprecation warning in terminal */ );
// Code to use body-parser 
app.use(bodyParser.urlencoded({extended: true}));
// Code to remove need to include '.ejs' after <filename>
app.set('view engine', 'ejs');

app.use(express.static('public'))

// ===== PASSPORT CONFIG =====
app.use(require('express-session')({
    secret: "Don't tell the secret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());


// Iterate across each object contained in JSON data list
let post_list = data.data.children;
post_list.forEach((post) => {
    let votes = post.data.ups;
    let title = post.data.title;
    let post_text = post.data.selftext;
    let subredditName = post.data.subreddit_name_prefixed;
    let author = post.data.author;
    let commentCount = post.data.num_comments;
    let media_url = post.data.url;
    let image_thumbnail = post.data.thumbnail;
    let image_thumbnail_height = post.data.thumbnail_height;
    let image_thumbnail_width = post.data.thumbnail_width;
    let post_hint = post.data.post_hint;
    let video_url = post.data.media;

    let createdDate = new Date(post.data.created_utc * 1000);
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
    /*
    // For every object in array, use .create() method for every object in the model.
    RedditPost.create(
    {
        votes: post.data.ups,
        title: post.data.title,
        post_text: post.data.selftext,
        subredditName: post.data.subreddit_name_prefixed,
        author: post.data.author,
        commentCount: post.data.num_comments,
        media_url: post.data.url,
        image_thumbnail: post.data.image_thumbnail,
        image_thumbnail_height: post.data.image_thumbnail_height,
        image_thumbnail_width: post.data.image_thumbnail_width,
        post_hint: post.data.post_hint,
        video_url: post.data.media,

        createdDate: new Date(post.data.created_utc * 1000),
        createdDateYears: createdDate.getFullYear(),
        createdDateMonths: createdDate.getMonth(),
        createdDateDays: createdDate.getDay(),
        createdDateHours: createdDate.getHours(),
        createdDateMinutes: createdDate.getMinutes(),
        createdDateSeconds: createdDate.getSeconds(),

        currentDate: new Date(),
        currentDateYears: currentDate.getFullYear(),
        currentDateMonths: currentDate.getMonth(),
        currentDateDays: createdDate.getDay(),
        currentDateHours: currentDate.getHours(),
        currentDateMinutes: currentDate.getMinutes(),
        currentDateSeconds: currentDate.getSeconds(),
        timeSincePosting: timeSincePosting
    }, (err, redditPost) => {
        if(err){
            console.log(err);
        } else {
            console.log('Newly created Reddit Post!');
        }
    })
    */
});


// =============================================================================

// ===== REDDIT POST ROUTES =====

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

// === INDEX ===
app.get('/reddit-posts', (req, res) => {
   // Get all Reddit Posts from database
   RedditPost.find({}, (err, allRedditPosts) => {
       if(err) {
            console.log(err);
       } else {
            res.render('redditpost/reddit-posts', {redditPosts: allRedditPosts});
       }
   })
})

// === CREATE ===
app.post('/reddit-posts', (req, res) => {
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
            res.redirect('/reddit-posts');
        }
    })
})

// === NEW ===
app.get('/reddit-posts/new', (req, res) => {
    res.render('redditpost/new');
})

// === SHOW ===
app.get('/reddit-posts/:id', (req, res) => {
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
// ===== REDDIT POST COMMENTS ROUTES =====

// === INDEX ===
app.get('/reddit-posts/:id/comments/new', (req, res) => {
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
app.post('/reddit-posts/:id/comments', (req, res) => {
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
app.listen(port, () => {
    console.log(`app.listen on port ${port}`);
})
