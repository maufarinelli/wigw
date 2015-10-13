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
    console.log('DIIIIIIIIRRRR : ', __dirname);
    // Temp sendFile, until send the json
    res.sendFile(__dirname + '/mock/exponent.json');
});

app.listen(9090);

//var dbManager = require('./db.manager.js');