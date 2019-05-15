const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Code to remove need to include '.ejs' after <filename>
app.set('view engine', 'ejs');

app.use(express.static('public'))

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
    res.render('reddit-posts'/*, {redditPosts: redditPosts}*/);
})

app.listen(port, () => {
    console.log(`app.listen on port ${port}`);
})

//module.exports = app;
