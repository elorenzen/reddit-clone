const methodOverride = require('method-override'), 
      LocalStrategy  = require('passport-local'),
      bodyParser     = require('body-parser'),
      mongoose       = require('mongoose'),
      passport       = require('passport'),
      express        = require('express'),
      session        = require('express-session'),
      port           = process.env.PORT || 3000,
      app            = express(),
      //MODELS
      RedditPost = require('./models/reddit-posts'),
      Comment    = require('./models/comment'),
      User       = require('./models/user'),
      // Imported JSON data
      data = require('./reddit-data.json');

      //ROUTES
const commentRoutes = require('./routes/comments'), 
      postRoutes    = require('./routes/posts'),
      authRoutes    = require('./routes/auth');

// Connect to database
mongoose.connect('mongodb://localhost/reddit_clone', {useNewUrlParser: true} /* <-- Removes deprecation warning in terminal */ );
// Code to use body-parser 
app.use(bodyParser.urlencoded({extended: true}));
// Code to remove need to include '.ejs' after <filename>
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(methodOverride('_method'));

// ===== PASSPORT CONFIG =====
app.use(require('express-session')({
    secret: "Don't tell the secret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to pass currentUser into every rendered template
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});
// ===== END OF PASSPORT CONFIG =====

app.use(authRoutes);
app.use('/reddit-posts', postRoutes);
app.use('/reddit-posts/:id/comments', commentRoutes);

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
app.listen(port, () => {
    console.log(`app.listen on port ${port}`);
})
