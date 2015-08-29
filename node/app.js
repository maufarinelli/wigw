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

// Mongo DB
// dbPath: /usr/local/var/mongodb
// sudo mongod
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'), 
    ObjectID = require('mongodb').ObjectID,
    url = 'mongodb://localhost:27017/wigw';

/**
 * insert Document 
 * @param  {Object}   db         
 * @param  {JSON}     document to be inserted
 * @param  {String}   collection - name of the collection
 * @param  {Function} callback
 */
var insertDocument = function(db, document, collection, callback) {
    db.collection(collection).insertOne(document, 
        function(err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the " + collection + " collection.");
            callback(result);
        });
};

/**
 * Get All Documents from a collection
 * @param  {Object}   db
 * @param  {String}   collection - name of the collection
 * @param  {Function} callback
 */
var getAllDocuments = function(db, collection, callback) {
    var cursor = db.collection(collection).find();

    cursor.each(function(err, document) {
        assert.equal(err, null);

        if(document !== null) {
            //TODO: see what to do later
            console.dir(document);
        }
        else {
            callback();
        }
    });
};

/**
 * Get a Document from a collection
 * @param  {Object}   db
 * @param  {Object}   query object eg: {key: value}
 * @param  {String}   collection - name of the collection
 * @param  {Function} callback
 */
var getDocument = function(db, query, collection, callback) {
    var cursor = db.collection(collection).find(query);

    cursor.each(function(err, document) {
        assert.equal(err, null);

        if(document !== null) {
            console.dir(document);
        }
        else {
            callback();
        }
    });
};

/**
 * Update Document from a collection
 * @param  {Object}   db
 * @param  {object}   where - object eg: {key: value}
 * @param  {Object}   set - object eg: {key: value}
 * @param  {String}   collection - name of the collection
 * @param  {Function} callback
 */
var updateDocument = function(db, where, set, collection, callback) {
    db.collection(collection).updateOne(
        where,
        {
            $set: set,
            $currentDate: {'lastModified': true}
        },
        function(err, results) {
            console.log(results);
            callback();
        }
    );
};

/**
 * Remove Document from a collection
 * @param  {Object}   db
 * @param  {[type]}   query object eg: {key: value}
 * @param  {[type]}   collection - name of the collection
 * @param  {Function} callback
 */
var removeDocument = function(db, query, collection, callback) {
    db.collection(collection).deleteMany(
        query, 
        function(err, results) {
            console.log(results);
            callback();
        }
    )
};

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var json = require('./mock/palmeiras.json');

    /*insertDocument(db, json, 'teams', function(result) {
        console.log('Result : ' + result);
        db.close();
    })*/

    /*getAllDocuments(db, 'teams', function() {
        db.close();
    });*/

    getDocument(db, {name: 'Palmeiras'},'teams', function() {
        db.close();
    });

    /*removeDocument(db, {name: 'Palmeiras'}, 'teams', function() {
        db.close();
    });*/

    /*pdateDocument(db, {name: 'Palmeiras'}, {'standings.wins': 10}, 'teams', function() {
        db.close();
    });*/
});