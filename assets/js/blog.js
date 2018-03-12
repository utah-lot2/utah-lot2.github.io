var app = new Vue({
    el: '#blogapp',
    data: {
      message: 'Hello Vue!',
      posts: []    
    },
    created: function() {
        console.log("Getting blog");
        var that = this;
        $.ajax({
            type: 'GET',
            url: "https://api.tumblr.com/v2/blog/utah-lot2.tumblr.com/posts?api_key=ekDkwXEZzdxqJNwEtwW64qRtmJW0LQjmgc7BI10W9w0Ywlo1qy",
            async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(json) {
                console.log(json);
                /*
                var latest = json.response.posts[0];
                $("#blog-headline").text(latest.title);
                $("#blog-body").html(latest.body);
                */
                that.posts = json.response.posts;
                /*
                json.response.posts.forEach(function(el, i) {
                    if(i > 4) return false;
                    $("#blog-more").append("<li><a href='"+ el.post_url +"'>"+ el.title +"</li>");
                });
                 */
            },
            error: function(e) {
                console.log(e.message);
            }
        });    
    }
})
