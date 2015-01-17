module.exports = function(app) {
	app.get("/api", function(req, res) {
		res.send({
			message: "The API is up and running!"
		});
	});

	app.post("/api/submit", function(req, res) {
		var userKey = req.param("user");
		
	});
};