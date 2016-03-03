/**
 * Created by stevedezitter on 02/03/16.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var projectService = (function() {

    //MongoClient.connect(url, function(err, db) {
    //    assert.equal(null, err); //Assert that err equals null
    //    console.log("connected to database");
    //    db.close();
    //});

    var getProjects = function() {
        return [
            {
                projectName: "project1",
                projectDescription: "omschrijving van project1"
            },
            {
                projectName: "project2",
                projectDescription: "omschrijving van project2"
            }
        ];
    }

    return {
        getProjects: getProjects
    };
})();

module.exports = projectService;