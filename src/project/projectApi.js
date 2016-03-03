/**
 * Created by stevedezitter on 02/03/16.
 */
var express = require('express');
//var projectServiceModule = require('./projectService');
var projectService = require('./projectService');

var router = express.Router();

router.get('/', function(req, res, next){

    console.log('projectApi.get(/projects)');

    //var projectService = projectServiceModule();

    res.json(projectService.getProjects());
});

module.exports = router;