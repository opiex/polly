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
    //console.log(docs);
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

app.put('/questions/vote', function (req, res) {
  var id = req.body.question._id;
  var index = req.body.response;
  var numToAdd = req.body.numToAdd;
  console.log("receieved request to add " +numToAdd + " to " +id +"in index " +index);
  var answers = req.body.question.answers;
  answers[index].votes++;
  console.log(answers);


  db.polly.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {answers: answers}},
    new: true}, function (err, doc) {
      res.json(doc);
    });



});


app.put('/questions', function (req, res) {
  console.log('-----------------');
  var id = req.body._id;
  var questionType = req.body.questionType;
  console.log("called to edit " +id);
  console.log("question type " +questionType);
  console.log(req.body);
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
