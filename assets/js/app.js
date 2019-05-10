
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
    $.ajax("https://www.reddit.com/best/.json?", {
        success: data => {
            let post_list = data.data.children;
            console.log("Successfully loaded 'best' list");
            for(let i = 0; i < post_list.length; i++){
                let post = post_list[i].data;
                let votes = post.ups;
                let title = post.title;
                let post_text = post.selftext;

                let subredditName = post.subreddit_name_prefixed;
                let username = post.author;
                let commentCount = post.num_comments;
                let media_url = post.url;
                let image_thumbnail = post.thumbnail;
                let image_thumbnail_height = post.thumbnail_height;
                let image_thumbnail_width = post.thumbnail_width;
                let post_hint = post.post_hint;
                let video_url = post.media_domain_url;

                let createdDate = new Date(post.created_utc * 1000);
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


                let html =  `<div class="post">
                                <!-- POST SHOULDER -->
                                <div class="post_shoulder" style="width: 40px; border-left: 4px solid transparent;">
                                    <div class="post_shoulder_content">
                                        <button class="upvote">
                                            <i class="fas fa-arrow-up"></i>
                                        </button>
                                        <div class="post_votes" style="display: block; color: rgb(26, 26, 27);">`
                    html +=                 votes;                
                    html +=             `</div>
                                        <button class="downvote">
                                            <i class="fas fa-arrow-down"></i>
                                        </button>
                                    </div>
                                </div>
                                <!-- POST CONTENT -->
                                <div class="post_content_container">`;

                // ==== WHEN REDDIT POST MEDIA IS LINK ===
                    if(post_hint === "link") {
                    html +=         `<article class="post_content">
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
                    html +=                                     subredditName;
                    html +=                                 `</a>
                                                        </div>
                                                        <span class="post_divider">•</span>
                                                        <span class="posted_by">Posted by</span>
                                                        <div style="display: inline-block">
                                                            <a class="post_author">`
                    html +=                                     username;                           
                    html +=                                 `</a>
                                                        </div>
                                                        <a class="posted_date">`
                    html +=                                 timeSincePosting;
                    html +=                             `</a>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- CODE FOR THE POST TITLE -->
                                            <div style="margin: 0px 8px; display: block;">
                                                <span class="post_content_title_container">
                                                    <a href="#" class="post_title_url">
                                                        <h2 class="post_title">`
                    html +=                                 title;
                    html +=                             `</h2>
                                                    </a>
                                                </span>
                                            </div>

                                            
                                            <!-- CODE FOR THE POST MEDIA(IMAGES, VIDEO) URL-->
                                            <div style="display: flex; margin-top: 0px;">
                                                <a href='${media_url}' class="post_media_url">`;
                    html +=                         media_url;
                    html +=                         `<i class="fas fa-external-link-alt"></i>
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
                                                    <div class="media_preview" style="background-image: url(`;
                    html +=                             image_thumbnail;
                    html +=                             `")>
                    
                                                        <div class="media_click_icon">
                                                            <i class="fas fa-external-link-alt" style="color: white"></i>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </article>`;
                    } 
                
                // === WHEN REDDIT POST MEDIA IS IMAGE ===
                    else if (post_hint === "image") {
                        html +=     `<article class="post_content">
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
                    html +=                                     subredditName;
                    html +=                                 `</a>
                                                        </div>
                                                        <span class="post_divider">•</span>
                                                        <span class="posted_by">Posted by</span>
                                                        <div style="display: inline-block">
                                                            <a class="post_author">`
                    html +=                                     username;                           
                    html +=                                 `</a>
                                                        </div>
                                                        <a class="posted_date">`
                    html +=                                 timeSincePosting;
                    html +=                             `</a>
                                                    </div>
                                                </div>
                                            </div>`;
                                            
                    html +=                 `<!-- CODE FOR THE POST TITLE -->
                                            <div style="margin: 0px 8px; display: block;">
                                                <span class="post_content_title_container">
                                                    <a href="#" class="post_title_url">
                                                        <h2 class="post_title">`
                    html +=                                 title;
                    html +=                             `</h2>
                                                    </a>
                                                </span>
                                            </div>`;

                    /*
                    html +=                 `<!-- CODE FOR THE POST MEDIA(IMAGES, VIDEO) URL-->
                                            <div style="display: flex; margin-top: 0px;">
                                                <a href='${media_url}' class="post_media_url">`;
                    html +=                         media_url;

                    html +=                     `); height: ${image_thumbnail_height}; width: ${image_thumbnail_width};">
                                                </div>
                                            </div>`
                       */                     

                    // START OF WORKING CODE
                        /*
                    html +=                 `<img src="${image_thumbnail}" style="width: ${image_thumbnail_width}; height: ${image_thumbnail_height}">`;
                                         
                    html +=             `</div>

                                        <div class="post_content_media">
                                            <!-- CODE FOR THE 'JOIN' BUTTON -->
                                            <button class="post_content_join">
                                                <i class="fas fa-plus"></i>
                                                Join
                                            </button>`;
                        */
                    // END OF WORKING CODE
                    
                                            
                    html +=             `<div class="post_content_media">
                                            <button class="post_content_join">
                                                <i class="fas fa-plus"></i>
                                                Join
                                            </button>`
                                        
                                            
                    html+=              `</div>
                                    </article>`;
                    }

                // === WHEN REDDIT POST MEDIA IS VIDEO ===
                    else if (post_hint === "rich:video" || post_hint === "hosted:video") {
                        html += `<article class="post_content">
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
                    html +=                                     subredditName;
                    html +=                                 `</a>
                                                        </div>
                                                        <span class="post_divider">•</span>
                                                        <span class="posted_by">Posted by</span>
                                                        <div style="display: inline-block">
                                                            <a class="post_author">`
                    html +=                                     username;                           
                    html +=                                 `</a>
                                                        </div>
                                                        <a class="posted_date">`
                    html +=                                 timeSincePosting;
                    html +=                             `</a>
                                                    </div>
                                                </div>
                                            </div>`;
                                            
                    html +=                 `<!-- CODE FOR THE POST TITLE -->
                                            <div style="margin: 0px 8px; display: block;">
                                                <span class="post_content_title_container">
                                                    <a href="#" class="post_title_url">
                                                        <h2 class="post_title">`
                    html +=                                 title;
                    html +=                             `</h2>
                                                    </a>
                                                </span>
                                            </div>`

                                            /*
                                            <!-- CODE FOR THE POST MEDIA(IMAGES, VIDEO) URL-->
                                            <div style="display: flex; margin-top: 0px;">
                                                <div style="background-image: url(`;
                    html +=                         image_thumbnail;

                    html +=                     `); height: ${image_thumbnail_height}; width: ${image_thumbnail_width};">
                                                </div>
                                            </div>
                                            */
                                           /*
                    html +=                 `<img src="${image_thumbnail}" style="width: ${image_thumbnail_width}; height: ${image_thumbnail_height}">`;
                                         */
                                        
                    html +=                 `<iframe src="`;
                    html +=                     video_url;
                    html +=                 `"></iframe>`;
            
                    html +=             `</div>

                                        <div class="post_content_media">
                                            <!-- CODE FOR THE 'JOIN' BUTTON -->
                                            <button class="post_content_join">
                                                <i class="fas fa-plus"></i>
                                                Join
                                            </button>`;
                                            /*
                                            <!-- CODE FOR THE MEDIA -->
                                            <div class="media_container">
                                                <a href='#'>
                                                    <div class="media_preview" style="background-image: url(`;
                    html +=                             image_thumbnail;
                    html +=                             `")>
                    
                                                        <div class="media_click_icon">
                                                            <i class="fas fa-external-link-alt" style="color: white"></i>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            */
                    html+=              `</div>
                                    </article>`;

                    }
                    else {
                        html +=     `<article class="post_content">
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
                    html +=                                     subredditName;
                    html +=                                 `</a>
                                                        </div>
                                                        <span class="post_divider">•</span>
                                                        <span class="posted_by">Posted by</span>
                                                        <div style="display: inline-block">
                                                            <a class="post_author">`
                    html +=                                     username;                           
                    html +=                                 `</a>
                                                        </div>
                                                        <a class="posted_date">`
                    html +=                                 timeSincePosting;
                    html +=                             `</a>
                                                    </div>
                                                </div>
                                            </div>`;

                    html +=                 `<!-- CODE FOR THE POST TITLE -->
                                            <div style="margin: 0px 8px; display: block;">
                                                <span class="post_content_title_container">
                                                    <a href="#" class="post_title_url">
                                                        <h2 class="post_title">`
                    html +=                                 title;
                    html +=                             `</h2>
                                                    </a>
                                                </span>
                                            </div>`;

                    // NEW CODE FOR POST_TEXT
                        if (post_text !== "") {
                    html +=                 `<!-- CODE FOR THE POST TEXT -->
                                            <div class="post_text">`;
                    html +=                     post_text;
                    html +=                 `</div>`;                        
                       }
                    // END OF NEW CODE FOR POST_TEXT


                    // NEW CODE FOR THE JOIN BUTTON
                    html +=                 `<div class="post_content_media">
                                                <button class="post_content_join">
                                                    <i class="fas fa-plus"></i>
                                                    Join
                                                </button>
                                            </div>`
                                                                      
                    // END OF NEW CODE FOR THE JOIN BUTTON

                    html +=              `</div>
                                    </article>`;
                    }
                                    

                                    // === POST BUTTONS ===
                    html +=         `<div class='post_content_buttons_container'>
                                        <div class='post_content_buttons'>
                                            <a class='comment_button'>
                                                <i class='fas fa-comment-alt'></i>
                                                <span class='post_comments'>`;
                    html +=                         `${commentCount} Comments`;
                    html +=                     `</span>
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
                                </div>
                            </div> <!-- End of "post_content_container -->
                        </div> <!-- End of "post" -->`;

                    $('.post_list').append(html);

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


