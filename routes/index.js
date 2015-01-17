var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});



	/* Handle Login POST
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true
	}));*/

	/* Handle Login POST */
	router.post("/login", function(req, res, next) {
		passport.authenticate("login", function(err, user, info) {
			console.log("LE USER INFO");
			console.dir(user);
			req.logIn(user, function(err2) {
				if (err2) { return res.redirect("/"); }
				return res.redirect("/home");
			});
		})(req, res, next);
	});

	router.get('/ext', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('extension');
	});


	router.post('/testpost', function(req, res){
	'use strict';
    console.log(req.body);
    console.log("user: " + req.param('user'));
    console.log("title: " + req.param('title'));
    console.log("url: " + req.param('url'));
    res.send("hey");
});



	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});


	/* Handle Registration POST
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true
	}, function(err, user, info) {
		console.dir(err);
		console.dir(user);
		console.dir(info);
	}));*/

	/* Handle Registration POST */
	router.post("/signup", function(req, res, next) {
		passport.authenticate("signup", function(err, user, info) {
			console.dir(err);
			console.dir(user);
			console.dir(info);
		})(req, res, next);
	});

	// Handle logout
	router.get('/logout', function(req, res){
		  req.logout();
		    res.redirect('/');
	});

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}





