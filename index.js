var express = require("express");
var bodyParser = require("body-parser");


var bot_lang = require("bot-lang").default;
var qtypes = require("qtypes");
var pos = require("pos");

var app = express();

app.get("/", function(req, res){
	res.sendFile(__dirname + "/public/index.html");
});

app.use("/interprete", bodyParser.urlencoded({extended: false}));
app.post("/interprete", function(req, res){

	var text = req.body.text;

	var expandedText = bot_lang.replace.contraction(text);

	var words = new pos.Lexer().lex(expandedText);
	var tagger = new pos.Tagger();
	var taggedWords = tagger.tag(words);

	var classifier = new qtypes(function(q){});

	res.json(classifier.questionType(expandedText));
});

app.listen(8081);
console.log("listening in localhost port 8081");