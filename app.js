var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var projectRouter = require('./src/project/projectRouter');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/project', projectRouter());

module.exports = app;
