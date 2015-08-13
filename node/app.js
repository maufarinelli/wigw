var express = require('express')
    app = express(),
    bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/team/', function(req, res) {
    // Temp sendFile, until send the json
    res.sendFile(__dirname + '/mock/' + req.query.name + '.json');
});

app.get('/exponent/', function(req, res) {
    // Temp sendFile, until send the json
    res.sendFile(__dirname + '/mock/exponent.json');
});

app.listen(9090);

// Mongo DB First test
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});