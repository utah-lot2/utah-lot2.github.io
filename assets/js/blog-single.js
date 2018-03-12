var app = new Vue({
    el: '#blogapp',
    data: {
      message: 'Hello Vue!',
      posts: []    
    },
    methods: {
        getUrlParameter: function (name) {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        }
    },
    created: function() {
        var that = this;
        var postId = this.getUrlParameter("id");
        $.ajax({
            type: 'GET',
            url: "https://api.tumblr.com/v2/blog/utah-lot2.tumblr.com/posts?api_key=ekDkwXEZzdxqJNwEtwW64qRtmJW0LQjmgc7BI10W9w0Ywlo1qy&id="+postId,
            async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(json) {                
                that.posts = json.response.posts;
                console.log(json.response.posts);
            },
            error: function(e) {
                console.log(e.message);
            }
        });    
    }
})
