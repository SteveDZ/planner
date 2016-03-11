var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var projectRouter = require('./src/project/projectRouter');
var projectService = require('./src/project/projectService');

var app = function(db) {

    var initializeApp = function() {
        var expressApp = express();

        expressApp.use(logger('dev'));
        expressApp.use(bodyParser.json());
        expressApp.use(bodyParser.urlencoded({ extended: false }));

        expressApp.use('/api/project', projectRouter(projectService(db)));

        return expressApp;
    };

    return {
        initializeApp: initializeApp
    }
};

module.exports = app;