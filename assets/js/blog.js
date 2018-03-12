var app = new Vue({
    el: '#blogapp',
    data: {
      message: 'Hello Vue!',
      posts: []    
    },
    created: function() {
        var that = this;
        $.ajax({
            type: 'GET',
            url: "https://api.tumblr.com/v2/blog/utah-lot2.tumblr.com/posts?api_key=ekDkwXEZzdxqJNwEtwW64qRtmJW0LQjmgc7BI10W9w0Ywlo1qy",
            async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(json) {                
                that.posts = json.response.posts;
            },
            error: function(e) {
                console.log(e.message);
            }
        });    
    }
})
