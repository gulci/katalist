
var mongoose = require('mongoose');

module.exports = mongoose.model('data',{
	id: String,
	url: String,
	title: String,
	owner: String
});