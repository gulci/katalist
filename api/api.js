module.exports = function(app) {
  app.get("/api", function(req, res) {
    res.send({
      message: "The API is up and running!"
    });
  });

  app.post("/api/login", function(req, res) {

  });
};
