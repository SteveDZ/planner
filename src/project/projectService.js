/**
 * Created by stevedezitter on 02/03/16.
 */
var ObjectID = require('mongodb').ObjectID;
var assert = require('assert');

var projectService = function(db) {

    var getAllProjects = function(callback) {
        console.log('projectService#getAllProjects');

        db.collection('projects').find({}).toArray(function(err, projects){
            assert.equal(err, null);
            assert.equal(3, projects.length);
            callback(projects);
        });
    };

    var findProjectById = function(projectId, callback) {
        console.log('projectService#findProjectById (' + projectId + ')');

        var projectObjectId = new ObjectID(projectId);
        db.collection('projects').find({_id: projectObjectId}).toArray(function(err, projects) {
            assert.equal(err, null);
            callback(projects[0]);
        });
    };

    return {
        getAllProjects: getAllProjects,
        findProjectById: findProjectById
    };
};

module.exports = projectService;