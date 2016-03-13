var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient; 
var assert = require('assert'); 

var projectRouter = require('./src/project/projectRouter');
var projectService = require('./src/project/projectService');

var app = (function() {

    var initializeMongo = function(mongoOptions, callback) {
        MongoClient.connect('mongodb://localhost:27017/plannerDb', mongoOptions, function(err, database) {
            if(err) {
                console.log('Error: ' + err);
            }
            callback(database);
        });
    };

    var initializeExpressApp = function(db) {
        var app = express();

        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));

        app.use('/api/project', projectRouter(projectService(db)));

        return app;
    };

    return {
        initializeDb: initializeMongo,
        initializeApp: initializeExpressApp
    };
})();

module.exports = app;