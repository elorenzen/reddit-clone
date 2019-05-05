
console.log("Server is started");

if(typeof jQuery!=='undefined'){
    console.log('jQuery Loaded');
}
else{
    console.log('not loaded yet');
}

$(document).ready(function(){
    $.ajax("https://www.reddit.com/best/.json?limit=1", {
        success: data => {
            let post_list = data.data.children;
            console.log("Successfully loaded 'best' list");
            for(let i = 0; i < post_list.length; i++){
                let post = post_list[i].data;
                let votes = post.ups;
                let title = post.title;
                let subredditName = post.subreddit_name_prefixed;
                let username = post.author;
                let commentCount = post.num_comments;
                //Add post title 
                $('.post_title').text(title);
                //Add subreddit name
                $('.subreddit_name').text(subredditName);
                //Add username
                $('.post_author').text(username);
                //Add number of comments
                $('.post_comments').text(commentCount);
                
                if(votes === 0){
                    $('post_title').text('•');
                } else {
                    $('.post_votes').text(votes);
                }
            }
        },
        error: function(){
            console.log("Problem loading 'best' list");
        } 
    });
});

$('.filter_hot').click(function(){
    $.ajax('https://www.reddit.com/hot/.json?limit=1', {
        success: data => {
            let post_list = data.data.children;
            console.log("Successfully loaded 'hot' list");
            for(let i = 0; i < post_list.length; i++){
                let post = post_list[i].data;
                let votes = post.ups;
                let title = post.title;
                let subredditName = post.subreddit_name_prefixed;
                let username = post.author;
                let commentCount = post.num_comments;
                //Add post title 
                $('.post_title').text(title);
                //Add subreddit name
                $('.subreddit_name').text(subredditName);
                //Add username
                $('.post_author').text(username);
                //Add number of comments
                $('.post_comments').text(commentCount);
                
                if(votes === 0){
                    $('post_title').text('•');
                } else {
                    $('.post_votes').text(votes);
                }
            }
        }, 
        error: function(){
            console.log("Problem loading 'hot' list");
        }
    })
});

$('.filter_new').click(function(){
    $.ajax('https://www.reddit.com/new/.json?limit=1', {
        success: data => {
            let post_list = data.data.children;
            console.log("Successfully loaded 'new' list");
            for(let i = 0; i < post_list.length; i++){
                let post = post_list[i].data;
                let votes = post.ups;
                let title = post.title;
                let subredditName = post.subreddit_name_prefixed;
                let username = post.author;
                let commentCount = post.num_comments;
                //Add post title 
                $('.post_title').text(title);
                //Add subreddit name
                $('.subreddit_name').text(subredditName);
                //Add username
                $('.post_author').text(username);
                //Add number of comments
                $('.post_comments').text(commentCount);
                
                if(votes === 0){
                    $('post_title').text('•');
                } else {
                    $('.post_votes').text(votes);
                }
            }
        }, 
        error: function(){
            console.log("Problem loading 'new' list");
        }
    })
});




