var express 	= require("express");
var mongoose 	= require("mongoose");
var path 	= require("path");
var bodyParser	= require("body-parser");
var convert	= require("./convert.js");
var app 	= express();
var Url 	= require("./models/url.js");

mongoose.connect("mongodb://localhost/url_shortener");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

var loc = "http://localhost:3000";

app.get('/', function(req, res) {
	res.render("home", {shortUrl: ""});
});

app.post('/shorten', function(req, res) {
	var longUrl = req.body.url;
	console.log("Long URL is " + longUrl);
	var shortUrl = '';

	Url.findOne({long_url: longUrl}, function(err, data) {
		if (data) {
			shortUrl = loc + "/" + convert.encode(data._id);
			console.log("data: " + shortUrl + " dataid: " + data._id);
			res.render("home", {shortUrl: shortUrl});
		} else {
			var newUrl = Url({
				long_url: longUrl
			});
			
			newUrl.save(function(err) {
				if (err) {
					console.log("WHOA");
					console.log(err);
				}

				shortUrl = loc + "/" + convert.encode(newUrl._id);
				console.log("new " + shortUrl);
				res.render("home", {shortUrl: shortUrl});
			});
		}
	});
});

app.get('/:encoded', function(req, res) {
	var convertedId = req.params.encoded;
	var id = convert.decode(convertedId);
	console.log("Decoded ID: " + id);

	Url.findOne({_id: id}, function(err, data) {
		if (data) {
			console.log(data.long_url);
			res.redirect(data.long_url);
		} else {
			res.redirect(loc);
		}
	});
});

app.listen(3000, function() {
	console.log("Server started...");
});
