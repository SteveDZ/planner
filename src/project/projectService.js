/**
 * Created by stevedezitter on 02/03/16.
 */
var projectService = function(db) {

    var ObjectID = require('mongodb').ObjectID;

    var getAllProjects = function(callback) {
        console.log('projectService#getAllProjects');

        db.collection('projects').find({}).toArray(function(err, projects){
            assert.equal(err, null);
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

    var createProject = function(project, successHandler, errorHandler) {
        db.collection('projects').insertOne(project, function(err, result){
            if(err) {
                errorHandler(err);
                return;
            }
            result.project = project;
            successHandler(result);
        });
    };

    var updateCompleteProject = function(projectId, project, callback) {
        if(project._id) {
            callback({
                err: '_id attribute should not be present in the posted project',
                status: 403
            });
            return;
        }

        var projectObjectId = new ObjectID(projectId);
        db.collection('projects').replaceOne({_id:projectObjectId}, project, function(err, results) {
            callback({});
        });
    };

    var updatePartialProject = function(projectId, partialProject, callback) {
        var projectObjectId = new ObjectID(projectId);
        db.collection('projects').updateOne({_id: projectObjectId}, {$set: partialProject}, function(err, results){
            callback({});
        });
    };

    var deleteProject = function(projectId) {
        var projectObjectId  = new ObjectID(projectId);
        return db.collection('projects').deleteOne({_id: projectObjectId});
    };

    return {
        getAllProjects: getAllProjects,
        findProjectById: findProjectById,
        createProject: createProject,
        updateCompleteProject: updateCompleteProject,
        updatePartialProject: updatePartialProject,
        deleteProject: deleteProject
    };
};

module.exports = projectService;