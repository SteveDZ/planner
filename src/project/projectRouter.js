/**
 * Created by stevedezitter on 02/03/16.
 */
var routes = function(projectService) {
    var express = require('express');
    var projectsRouter = express.Router();

    projectsRouter
        .get('/', function(req, res){
            console.log('projectRouter#get');
            projectService.getAllProjects(function(projects) {
                if(projects && projects.length > 0) {
                    res.status(200).json(projects);
                }else{
                    res.status(404);
                }
            });
        })
        .get('/:projectId', function(req, res) {
            projectService.findProjectById(req.params.projectId, function(project) {
                if(project) {
                    res.status(200).json(project);
                }else {
                    res.status(404);
                }

            });
        })
        .post('/', function(req, res){
            projectService.createProject(req.body, function(result) {
                res.set('Location', 'http://' +  req.headers.host + '/api/project/' + result.project._id);
                res.sendStatus(201);
            }, function(error) {
                res.status(400).send(error);
            });
        })
        .put('/:projectId', function(req, res) {
            projectService.updateCompleteProject(req.params.projectId, req.body, function(result) {
                if(result.err) {
                    res.status(result.status).send(result.err);
                }else{
                    res.sendStatus(204);
                }
            });
        })
        .patch('/:projectId', function(req, res) {
            projectService.updatePartialProject(req.params.projectId, req.body, function(result) {
                if(result.err) {
                    res.status(result.status).send(result.err);
                }else{
                    res.sendStatus(204);
                }
            })
        })
        .delete('/:projectId', function(req, res) {
            // Delete implemented using promises
            var deletePromise = projectService.deleteProject(req.params.projectId);

            deletePromise.then(function(result){
                res.sendStatus(204);
            },
            function(err){
                res.sendStatus(400);
            });
        });

    return projectsRouter;
};



module.exports = routes;