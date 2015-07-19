var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('test', ['polly']);
var path = require('path');
var bodyParser = require('body-parser');
var ObjectId = require("mongojs").ObjectId;
var sassMiddleware = require('node-sass-middleware');

//console.log(__dirname + '\\sass');

// adding the sass middleware
app.use(
  sassMiddleware({
    src: __dirname + '/public/sass',
    dest: __dirname + '/public',
    debug: true,
    outputStyle: 'compressed'
  })
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());



app.get('/questions', function (req, res) {
  console.log('I received a GET request');
  db.polly.find(function (err, docs) {
    //console.log(docs);
    res.json(docs.reverse());
  });
});


app.get('/questions/:id', function (req, res) {
  console.log("receieved request for: " +req.params.id);
  db.polly.findOne({"_id": ObjectId(req.params.id)}, function(err, docs){
    res.json(docs);
  });
});

app.post('/questions', function (req, res) {
  db.polly.insert(req.body, function(err, doc) {
    console.log("inserted the question. sending back.");
    res.json(doc);
  });
});


app.put('/questions/vote', function (req, res) {
  var id = req.body.question._id;
  var index = req.body.response;
  var numToAdd = req.body.numToAdd;
  console.log("receieved request to add " +numToAdd + " to " +id +"in index " +index);
  var answers = req.body.question.answers;
  answers[index].votes+=numToAdd;
  //console.log(answers);


  db.polly.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {answers: answers}},
    new: true}, function (err, doc) {
      res.json(doc);
    });
});


app.put('/questions', function (req, res) {
  var id = req.body._id;
  var questionType = req.body.questionType;
  //console.log(req.body);
  var responses = req.body.responses;

  if(questionType === 'free'){
    db.polly.findAndModify({
      query: {_id: mongojs.ObjectId(id)},
      update: {$set: {responses: req.body.responses, answers: {}}},
      new: true}, function (err, doc) {
        res.json(doc);
      });
  }
  else{
    db.polly.findAndModify({
      query: {_id: mongojs.ObjectId(id)},
      update: {$set: {answers: req.body.answers}},
      new: true}, function (err, doc) {
        res.json(doc);
      }
      );
  }
});



app.listen(9000);
console.log("Server running on port 9000");
