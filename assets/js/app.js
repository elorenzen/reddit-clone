
console.log("Server is started");

if(typeof jQuery!=='undefined'){
    console.log('jQuery Loaded');
}
else{
    console.log('not loaded yet');
}

//Loads list of 'best' reddit posts upon opening file
$(document).ready(function(){
    $('.default_list').html('<a class="dropdown-item sort-dropdown-item" href="#"><i class="fas fa-splotch"></i>Best</a>');
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
                let html =  `<article class="post_content">
                                <div class="post_content_text">
                                    <div class="post_content_header">
                                    
                                    <!-- CODE FOR THE SUBREDDIT ICON IN THE REDDIT POST HEADER-->
                                    <div style="flex: 0 0 auto;">
                                        <a class="post_content_header_icon">
                                            <img class="subreddit_icon">
                                        </a>   
                                    </div>

                                    <!-- CODE FOR THE HEADER CONTAINING SUBREDDIT NAME POSTED BY USER -->
                                    <div style="flex: 1 1 auto">
                                        <div class="post_content_header_text">
                                            <div style="display: inline-block; flex: 0 0 auto">
                                                <a class="subreddit_name" style="color: rgb(28, 28, 28);">`;
                    html +=                         subredditName;
                    html +=                     `</a>
                                            </div>
                                            <span class="post_divider">•</span>
                                            <span class="posted_by">Posted by</span>
                                            <div style="display: inline-block">
                                                <a class="post_author">`
                    html +=                         username;                           
                    html +=                     `</a>
                                            </div>
                                            <a class="posted_date"> 12 hours ago</a>
                                        </div>
                                    </div>
                                </div>

                                <!-- CODE FOR THE POST TITLE -->
                                <div style="margin: 0px 8px; display: block;">
                                    <span class="post_content_title_container">
                                        <a href="#" class="post_title_url">
                                            <h2 class="post_title">`
                    html +=                     title;
                    html +=                         `</h2>
                                </a>
                        </span>
                    </div>

                    <!-- CODE FOR THE POST MEDIA(IMAGES, VIDEO) URL-->
                    <div style="display: flex; margin-top: 0px;">
                        <a href='#' class="post_media_url">https://www.examplesite.com
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>

                </div>
                
            <div class="post_content_media">
                <!-- CODE FOR THE 'JOIN' BUTTON -->
                <button class="post_content_join">
                    <i class="fas fa-plus"></i>
                    Join
                </button>
                <!-- CODE FOR THE MEDIA -->
                <div class="media_container">
                    <a href='#'>
                        <div class="media_preview">
                            <div class="media_click_icon">
                                <i class="fas fa-external-link-alt" style="color: white"></i>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            </article>`;
                html += "<div class='post_content_buttons_container'><div class='post_content_buttons'><a class='comment_button'><i class='fas fa-comment-alt'></i><span class='post_comments'>"
                html += `${commentCount} Comments`;
                
                html +=     `</span>
                        </a>
                        <div class='share_button_container'>
                            <button class='share_button'>
                                <i class='fas fa-share'></i>
                                <span style='display: inline-block; line-height: 1; vertical-align: middle;'>share</span>
                            </button>
                        </div>
                        <button class='save_button'>
                            <i class='fas fa-bookmark'></i>
                            <span>save</span>
                        </button>
                    </div>
                </div>`;

                $('.post_content_container').append(html);

                /* Start of original code

                //Add post title 
                $('.post_title').text(title);
                //Add subreddit name
                $('.subreddit_name').text(subredditName);
                //Add username
                $('.post_author').text(username);
                //Add number of comments
                $('.post_comments').text(commentCount + ' Comments');
                
                if(votes === 0){
                    $('post_title').text('•');
                } else {
                    $('.post_votes').text(votes);
                }

                End of original code */ 
            };
        },
        error: function(){
            console.log("Problem loading 'best' list");
        }
    });
})

// === TOP NAV DROPDOWN ===

// When top nav dropdown 'Popular' is clicked, reddit posts will update with said feed theme
$('.feed_popular').click(function(){
    $('.default_feed').html('<a class="dropdown-item feed_popular" href="#"><i class="fas fa-chart-line"></i>Popular</a>');
})

// When top nav dropdown 'all' is clicked, reddit posts will update with said feed theme
$('.feed_all').click(function(){
    $('.default_feed').html('<a class="dropdown-item feed_all" href="#"><i class="fas fa-chart-pie"></i>All</a>');
    $.ajax('https://www.reddit.com/r/all.json?limit=1', {
        success: data => {
            let post_list = data.data.children;
            console.log("Successfully loaded 'all' feed");
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
                $('.post_comments').text(commentCount + ' Comments');

                if(votes === 0){
                    $('post_title').text('•');
                } else {
                    $('.post_votes').text(votes);
                }
            }
        }, 
        error: function(){
            console.log("Problem loading 'all' feed");
        }
    });
});

// When top nav dropdown 'Original Content' is clicked, reddit posts will update with said feed theme
$('.feed_oc').click(function(){
    $.ajax('https://www.reddit.com/original.json?limit=1', {
        success: data => {
            let post_list = data.data.children;
            console.log("Successfully loaded 'Original Content' feed");
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
                $('.post_comments').text(commentCount + ' Comments');

                if(votes === 0){
                    $('post_title').text('•');
                } else {
                    $('.post_votes').text(votes);
                }
            }
        }, 
        error: function(){
            console.log("Problem loading 'Original Content' feed");
        }
    });
});

// === SECOND NAV DROPDOWN === 

// When second nav dropdown 'hot' is clicked, reddit posts update with said list theme
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
                $('.post_comments').text(commentCount + ' Comments');

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

// When second nav dropdown 'new' is clicked, reddit posts update with said list theme
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
                $('.post_comments').text(commentCount + ' Comments');

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

// When second nav dropdown 'controversial' is clicked, reddit posts update with said list theme
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
                $('.post_comments').text(commentCount + ' Comments');
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

// When second nav dropdown 'top' is clicked, reddit posts update with said list theme
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
                $('.post_comments').text(commentCount + ' Comments');
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

// When second nav dropdown 'rising' is clicked, reddit posts update with said list theme
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
                $('.post_comments').text(commentCount + ' Comments');
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


