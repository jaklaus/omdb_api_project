var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	request = require("request");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function(req,res){

	if(req.query.search){
		var query = req.query.search;
		var url = 'http://www.omdbapi.com/?s=' + query;

		request(url, function(err, response, body){
			if(!err && response.statusCode === 200){
				var parsedData = JSON.parse(body)
				res.render('home', {data:parsedData});
			}
		});
	} else {
		res.render('home', {data:[]});
	}
});

app.get("/movie/:info", function(req,res){

	if(req.params.info){
		var queryInfo = req.params.info;
		var url = 'http://www.omdbapi.com/?t=' + queryInfo + "&tomatoes=true";
		request(url, function(err, response, body){
			if(!err && response.statusCode === 200){
				var parsedData = JSON.parse(body)
				res.render('movie', {data:parsedData});
			}
		});
	} else {
		res.render('movie', {data:[]});
	}
});

app.listen(process.env.PORT, process.env.IP, function(req,res){
	console.log("OMDB api server running!")
});