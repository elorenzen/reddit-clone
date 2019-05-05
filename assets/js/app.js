
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
            console.log('Successfully loaded list');
            for(let i = 0; i < post_list.length; i++){
                let post = post_list[i].data;
                let votes = post.ups;
                let title = post.title;
                $('.post_title').append(title);
                if(votes === 0){
                    $('post_title').append('•');
                } else {
                    $('.post_votes').append(votes);
                }
            }
        },
        error: function(){
            console.log('Problem loading data');
        } 
    });
})
