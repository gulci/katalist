var ref = new Firebase("https://bookmarks-nice.firebaseio.com/");

var inds = [];

ref.on("value", function(snapshot) {
	var obj = snapshot.val();
	for(var ind in obj) {
		if (inds.indexOf(ind) == -1) {
			var html = "<div class='well well-lg' id='item-"+ind+"' style='display:none;'>";
			html += "<h2>" + obj[ind].title + "</h2>";
			html += "<h4><a href='" + obj[ind].url + "' target='_blank'>" + obj[ind].url + "</a></h4>";
			html += "<button class='upvote btn btn-default' type='button'><span class='glyphicon glyphicon-chevron-up'></span> "+obj[ind].numVotes+"</button>";
			html += "</div>";
			$("#post_container").prepend(html);
			$("#item-"+ind).slideDown("fast");
			inds.push(ind);
		}
	}
	console.dir(inds);
}, function (errorObject) {
	console.log("The read failed: " + errorObject.code);
});