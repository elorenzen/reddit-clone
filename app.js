const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Code to remove need to include '.ejs' after <filename>
app.set('view engine', 'ejs');

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(port, () => {
    console.log(`app.listen on port ${port}`);
})

//module.exports = app;
