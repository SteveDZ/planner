/**
 * Created by stevedezitter on 02/03/16.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var projectService = (function() {

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