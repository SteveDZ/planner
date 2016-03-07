/**
 * Created by stevedezitter on 02/03/16.
 */
var express = require('express');

var routes = function() {
    var projectsRouter = express.Router();

    var projects = [
        {
            _id: '1',
            title: 'AMDB Usermanagement',
            description: 'Usermanagement project',
            teamMembers: ['1','2']
        },
        {
            _id: '2',
            title: 'PROVIKMO Enterprise Mobility',
            description: 'Investigating a Enterprise Mobile solution towards building mobile apps. Take into account offline storage, security, etc...',
            teamMembers: ['3','4']
        },
        {
            _id: '3',
            title: 'PXS TV Overal',
            description: 'A Native mobile client which allows Proximus TV subscribers to watch TV on whatever device',
            teamMembers: ['5','6']
        }
    ];

    projectsRouter
        .get('/', function(req, res){
            res.json(projects);
        })
        .get('/:projectId', function(req, res) {

        })
        .post('/', function(req, res){
            var valueWithHighestIndex = projects.reduce(function(previousValue, currentValue, currentIndex, array) {
                var previousId = previousValue._id;
                var currentId = currentValue._id;
                return previousId > currentId ? previousValue: currentValue;
            });

            req.body._id = valueWithHighestIndex._id + 1;
            projects.push(req.body);

            res.status(201).send();
        })
        .put('/:projectId', function(req, res) {

        })
        .patch('/:projectId', function(req, res) {

        });

    return projectsRouter;
};



module.exports = routes;