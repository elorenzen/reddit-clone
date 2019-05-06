
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
                let subredditIconURL = post.icon_url;
                //Add post title 
                $('.post_title').append(title);
                //Add subreddit icon 
                $('.subreddit_icon').attr('src', 'subredditIconURL.val()');
                //Add subreddit name
                $('.subreddit_name').append(subredditName);
                //Add username
                $('.post_author').append(username);
                //Add number of comments
                $('.post_comments').append(commentCount);
                
                if(votes === 0){
                    $('post_title').append('•');
                } else {
                    $('.post_votes').append(votes);
                }
            }
        },
        error: function(){
            console.log("Problem loading 'best' list");
        } 
    });
})

$('.filter_hot').click(function(){
    $('.default_list').html('<a class="dropdown-item sort-dropdown-item filter_hot" href="#"><i class="fas fa-fire"></i>Hot</a>')
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
    });
});

$('.filter_new').click(function(){
    $('.default_list').html('<a class="dropdown-item sort-dropdown-item filter_new" href="#"><i class="fas fa-paper-plane"></i>New</a>');
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

$('.filter_controversial').click(function(){
    $('.default_list').html('<a class="dropdown-item sort-dropdown-item filter_controversial" href="#"><i class="fas fa-exclamation-circle"></i>Controversial</a>');
    $.ajax('https://www.reddit.com/controversial/.json?limit=1', {
        success: data => {
            let post_list = data.data.children;
            console.log("Successfully loaded 'controversial' list");
            for(let i = 0; i < post_list.length; i++){
                let post = post_list[i].data;
                let votes = post.ups;
                let title = post.title;
                let subredditName = post.subreddit_name_prefixed;
                let username = post.author;
                let commentCount = post.num_comments;
                let textContent = post.selftext;
                //Add post title 
                $('.post_title').text(title);
                //Add subreddit name
                $('.subreddit_name').text(subredditName);
                //Add username
                $('.post_author').text(username);
                //Add number of comments
                $('.post_comments').text(commentCount);
                //Add content
                $('.post_content').text(textContent);

                if(votes === 0){
                    $('post_title').text('•');
                } else {
                    $('.post_votes').text(votes);
                }
            }
        }, 
        error: function(){
            console.log("Problem loading 'controversial' list");
        }
    })
});

$('.filter_top').click(function(){
    $('.default_list').html('<a class="dropdown-item sort-dropdown-item filter_top" href="#"><i class="fas fa-level-up-alt"></i>Top</a>');
    $.ajax('https://www.reddit.com/top/.json?limit=1', {
        success: data => {
            let post_list = data.data.children;
            console.log("Successfully loaded 'top' list");
            for(let i = 0; i < post_list.length; i++){
                let post = post_list[i].data;
                let votes = post.ups;
                let title = post.title;
                let subredditName = post.subreddit_name_prefixed;
                let username = post.author;
                let commentCount = post.num_comments;
                let textContent = post.selftext;
                let image_url = post.thumbnail;
                let image_height = post.thumbnail_height;
                let image_width = post.thumbnail_width;
                //Add post title 
                $('.post_title').text(title);
                //Add subreddit name
                $('.subreddit_name').text(subredditName);
                //Add username
                $('.post_author').text(username);
                //Add number of comments
                $('.post_comments').text(commentCount);
                //Add text or image content
                if(textContent !== null){
                    // text content
                    $('.post_content').text(textContent);
                } else {
                    // image content
                    $('.post_content').html("<img src='image_url'>")
                }

                if(votes === 0){
                    $('post_title').text('•');
                } else {
                    $('.post_votes').text(votes);
                }
            }
        }, 
        error: function(){
            console.log("Problem loading 'top' list");
        }
    })
});

$('.filter_rising').click(function(){
    $('.default_list').html('<a class="dropdown-item sort-dropdown-item filter_rising" href="#"><i class="fas fa-signal"></i>Rising</a>');
    $.ajax('https://www.reddit.com/rising/.json?limit=1', {
        success: data => {
            let post_list = data.data.children;
            console.log("Successfully loaded 'rising' list");
            for(let i = 0; i < post_list.length; i++){
                let post = post_list[i].data;
                let votes = post.ups;
                let title = post.title;
                let subredditName = post.subreddit_name_prefixed;
                let username = post.author;
                let commentCount = post.num_comments;
                let textContent = post.selftext;
                //Add post title 
                $('.post_title').text(title);
                //Add subreddit name
                $('.subreddit_name').text(subredditName);
                //Add username
                $('.post_author').text(username);
                //Add number of comments
                $('.post_comments').text(commentCount);
                //Add content
                $('.post_content').text(textContent);

                if(votes === 0){
                    $('post_title').text('•');
                } else {
                    $('.post_votes').text(votes);
                }
            }
        }, 
        error: function(){
            console.log("Problem loading 'rising' list");
        }
    })
});


