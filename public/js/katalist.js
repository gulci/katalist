var ref = new Firebase("https://bookmarks-nice.firebaseio.com");

var inds = [];

ref.on("value", function(snapshot) {
  var obj = snapshot.val();
  for (var ind in obj) {
    if (inds.indexOf(ind) == -1) {
      var html = "<div class='card' id='item" + ind + "' style='display:none;'>";
      html += "<div class='card-heading simple'><h3>" + obj[ind].post.title + "</h3></div>";
      html += "<div class='card-body'><a href='" + obj[ind].post.url + "' target='_blank'>" + obj[ind].post.url + "</a></div>";
      html += "<div class='upvote-container'><button class='upvote btn btn-default' type='button'><span class='fa fa-sort-asc'></span> " + obj[ind].post.numVotes + "</button></div>";
      html += "</div>";
      $("#post_container").prepend(html);
      $("#item" + ind).slideDown("fast");
      inds.push(ind);
    }
  }

  $(".upvote").click(function() {
    console.log("called");
    var postId = $(this).parent().parent().attr('id').substring(4);
    console.log(postId);
    ref.child(postId + "/post/numVotes").once("value", function(current) {
      new Firebase('https://bookmarks-nice.firebaseio.com/'+postId+'/post').update({numVotes:+current.val()+1},function(){console.log("gud")});
    });
  });

  console.dir(inds);
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});
