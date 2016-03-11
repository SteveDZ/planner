/**
 * Created by stevedezitter on 02/03/16.
 */
var express = require('express');

var routes = function(projectService) {
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

    var findFilteredProject = function(projectId) {
        var filteredProjects = projects.filter(function(project) {
            return project._id === projectId;
        });

        if(filteredProjects && filteredProjects.length > 0) {
            return filteredProjects[0];
        }
    };

    projectsRouter
        .get('/', function(req, res){
            projectService.getAllProjects(function(projects) {
                res.json(projects);
            });
        })
        .get('/:projectId', function(req, res) {
            console.log('called /:projectId with id: ' + req.params.projectId);

            var projectId = req.params.projectId;

            var filteredProjects = projects.filter(function(project) {
                return project._id === projectId;
            });

            console.log(filteredProjects);

            if(filteredProjects && filteredProjects.length > 0){
                console.log('filteredProjects exist!');
                res.status(200).json(filteredProjects[0]);
            }else{
                console.log('Not found, no filteredProjects');
                res.status(404);
            }
        })
        .post('/', function(req, res){
            console.log('post api/projects/');
            var valueWithHighestIndex = projects.reduce(function(previousValue, currentValue, currentIndex, array) {
                var previousId = previousValue._id;
                var currentId = currentValue._id;
                return previousId > currentId ? previousValue: currentValue;
            });

            console.log(req.body);
            console.log(valueWithHighestIndex);

            req.body._id = (parseInt(valueWithHighestIndex._id, 10) + 1).toString();
            projects.push(req.body);

            res.status(201).send();
        })
        .put('/:projectId', function(req, res) {
            var filteredProjects = projects.filter(function(project) {
                return project._id === projectId;
            });

            if(filteredProjects && filteredProjects.length > 0) {
                filteredProjects[0] = req.body;
            }else{
                res.status(404);
            }
        })
        .patch('/:projectId', function(req, res) {
            console.log('calling patch: ' + req.params.projectId);
            var foundProject = findFilteredProject(req.params.projectId);

            for(p in req.body){
                console.log('property ' + p + ' is ' + foundProject[p] + ' vervangen met ' + req.body[p]);
                foundProject[p] = req.body[p];
            }

            res.status(204);
        });

    return projectsRouter;
};



module.exports = routes;