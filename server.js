var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('test', ['polly']);
var bodyParser = require('body-parser');
var ObjectId = require("mongojs").ObjectId;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


app.get('/questions', function (req, res) {
  console.log('I received a GET request');
  db.polly.find(function (err, docs) {
    console.log(docs);
    res.json(docs.reverse());
  });
});

app.get('/questions/:id', function (req, res) {
  console.log("receieved request for: " +req.params.id);
  db.polly.findOne({"_id": ObjectId(req.params.id)}, function(err, docs){
    console.log(docs);
    res.json(docs);
  });
});

app.post('/questions', function (req, res) {
  //console.log(req.body);
  db.polly.insert(req.body, function(err, doc) {
    console.log("inserted the question. sending back.");
    res.json(doc);
  });
});


app.listen(9000);
console.log("Server running on port 9000");
