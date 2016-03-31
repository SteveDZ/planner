var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient; 
var assert = require('assert'); 

var projectRouter = require('./src/project/projectRouter');
var taskRouter = require('./src/task/taskRouter');
var projectService = require('./src/project/projectService');
var taskService = require('./src/task/taskService');
var userRouter = require('./src/user/userRouter');
var userService = require('./src/user/userService');
var boardRouter = require('./src/board/boardRouter');
var boardService = require('./src/board/boardService');

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
        app.use('/api/task', taskRouter(taskService(db)));
        app.use('/api/user', userRouter(userService(db)));
        app.use('/api/board', boardRouter(boardService(db)));

        return app;
    };

    return {
        initializeDb: initializeMongo,
        initializeApp: initializeExpressApp
    };
})();

module.exports = app;