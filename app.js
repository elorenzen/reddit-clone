const bodyParser = require('body-parser'),
      mongoose   = require('mongoose')
      express    = require('express'),
      port       = process.env.PORT || 3000,
      app        = express();

// Connect to database
mongoose.connect('mongodb://localhost/reddit_clone', {useNewUrlParser: true} /* <-- Removes deprecation warning in terminal */ );
// Code to use body-parser 
app.use(bodyParser.urlencoded({extended: true}));
// Code to remove need to include '.ejs' after <filename>
app.set('view engine', 'ejs');

app.use(express.static('public'))

// SCHEMA SETUP
let redditPostSchema = new mongoose.Schema({
    title: String,
    upvotes: Number,
    author: String,
    subredditName: String,
    text: String,
    commentCount: Number,
    image_url: String,
    video_url: String
});

// Create a model using variable from SCHEMA SETUP
let RedditPost = mongoose.model('RedditPost', redditPostSchema);

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
            console.log(redditPost);
        }
    }
);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

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
            res.render('reddit-posts', {redditPosts: allRedditPosts});
       }
   })
})

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

app.get('/reddit-posts/new', (req, res) => {
    res.render('new');
})

app.listen(port, () => {
    console.log(`app.listen on port ${port}`);
})

//module.exports = app;
