/**
 * Created by stevedezitter on 02/03/16.
 */
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');

var projectService = function(db) {

    //var url = 'mongodb://localhost:27017/plannerDb';
    //
    //var getAllProjectsFromDb = function(db, callback) {
    //    console.log('projectService#getAllProjectsFromDb');
    //    db.collection('projects').find({}).toArray(function(err, docs) {
    //        assert.equal(err, null);
    //        assert.equal(3, docs.length);
    //        console.log('Found the following records');
    //        console.dir(docs);
    //        callback(docs);
    //    });
    //}
    //
    //var getProjects = function(callback) {
    //    console.log('projectService#getProjects')
    //    MongoClient.connect(url, function(err, db) {
    //        console.log('in MongoClient#connect');
    //        assert.equal(null, err);
    //
    //        getAllProjectsFromDb(db, function(projects) {
    //            console.log('closing database');
    //            db.close();
    //            callback(projects);
    //        });
    //    });
    //}

    var getAllProjects = function(callback) {
        db.collection('projects').find({}).toArray(function(err, projects){
            assert.equal(err, null);
            assert.equal(3, projects.length);
            console.log('Found the following records');
            console.dir(projects);
            callback(projects);
        });
    };

    return {
        getAllProjects: getAllProjects
    };
};

module.exports = projectService;