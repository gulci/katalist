var ref = new Firebase("https://bookmarks-nice.firebaseio.com");

var inds = [];
var obj;
var ind;
var postId;
var newVotes = 0;
var html = '';

ref.on("value", function(snapshot) {
  obj = snapshot.val();
  for (ind in obj) {
    if (inds.indexOf(ind) === -1) {
      html = "<div class='card' id='item" + ind + "' style='display:none;'>";
      html += "<div class='card-heading simple'><h3>" + obj[ind].post.title + "</h3></div>";
      html += "<div class='card-body'><a href='" + obj[ind].post.url + "' target='_blank'>" + obj[ind].post.url + "</a></div>";
      html += "<div class='upvote-container'><button class='upvote btn btn-default' type='button'><span class='fa fa-sort-asc'><span class='btn-number'>" + obj[ind].post.numVotes + "</span></span></button></div>";
      html += "</div>";
      $("#post_container").prepend(html);
      $("#item" + ind).slideDown("fast");
      inds.push(ind);

      $(".upvote").unbind('click', upvoteIncr);
      $(".upvote").bind('click', upvoteIncr);
    }
  }

  console.dir(inds);
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

var upvoteIncr = function() {
  console.log("called");
  postId = $(this).parent().parent().attr('id').substring(4);
  newVotes = parseInt($(this).find('.btn-number').text()) + 1;
  $(this).find('.btn-number').text(newVotes);
  console.log("new v ", newVotes);
  console.log(postId);
  ref.child(postId + "/post/numVotes").once("value", function(current) {
    new Firebase('https://bookmarks-nice.firebaseio.com/'+postId+'/post').update({numVotes:+current.val()+1},function(){console.log("gud")});
  });
}
