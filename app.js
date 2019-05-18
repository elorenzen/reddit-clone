const bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      express    = require('express'),
      port       = process.env.PORT || 3000,
      app        = express(),
      //MODELS
      RedditPost = require('./models/reddit-posts'),
      Comment    = require('./models/comment'),
      User       = require('./models/user');


// Connect to database
mongoose.connect('mongodb://localhost/reddit_clone', {useNewUrlParser: true} /* <-- Removes deprecation warning in terminal */ );
// Code to use body-parser 
app.use(bodyParser.urlencoded({extended: true}));
// Code to remove need to include '.ejs' after <filename>
app.set('view engine', 'ejs');

app.use(express.static('public'))

/*
RedditPost.create(
    {
    title: `The world now runs on video game logic, what's the first thing you do?`,
    subredditName: `r/AskReddit`,
    upvotes: 5700
    }, (err, redditPost) => {
        if(err){
            console.log(err);
        }
        else {
            console.log('Newly created Reddit Post!');
            // Create a comment
            Comment.create(
                {
                    text: 'This is a cool post. Thanks for sharing',
                    author: 'someRedditUser'
                }, (err, comment) => {
                    if(err) {
                        console.log(err);
                    } else {
                        redditPost.comments.push(comment);
                        redditPost.save();
                        console.log('Created new comment!');
                    }
                })
        }
    }
);
*/


// =============================================================================

// ===== REDDIT POST ROUTES =====

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

// === INDEX ===
app.get('/reddit-posts', (req, res) => {
  /*  
    let redditPosts = [
        {title: `The world now runs on video game logic, what's the first thing you do?`,
         subredditName: `r/AskReddit`,
         upvotes: '5.7k'},

        {title: `Exclusive: Amazon rolls out machines that pack orders and replace jobs`,
         subredditName: `r/news`,
         upvotes: '476'},

        {title: `If you were a citizen of King's Landing, what kind of ruler would you prefer?`,
         subredditName: `r/GOT`,
         upvotes: '1.3k'}
    ];
    */
   // res.render('reddit-posts'/*, {redditPosts: redditPosts}*/);

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
            console.log(foundPost);
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
