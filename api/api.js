module.exports = function(app) {
	app.get("/api", function(req, res) {
		res.send({
			message: "The API is up and running!"
		});
	});
};