/**
 * Created by stevedezitter on 15/03/16.
 */
var routes = function(taskService) {
    var express = require('express');
    var tasksRouter = express.Router();

    tasksRouter
        .get('/', function(req, res){
            taskService.findAll().then(
                function(tasks) {
                    res.status(200).json(tasks);
                },
                function(err) {
                    res.sendStatus(404);
                });
        })
        .get('/:taskId', function(req, res){
            taskService.findTaskById(req.params.taskId).then(
                function(task) {
                    res.status(200).json(task);
                },
                function(err) {
                    res.sendStatus(404);
                }
            );
        })
        .post('/', function(req, res){
            taskService.createTask(req.body).then(
                function(result){
                    res.set('Location', 'http://' + req.headers.host + '/api/task/' + result.insertedId);
                    res.sendStatus(201);
                },
                function(err){
                    res.sendStatus(500);
                });
        })
        .put('/:taskId', function(req, res){
            taskService.updateTask(req.params.taskId, req.body).then(
                function(result) {
                    res.sendStatus(204);
                },
                function(err){
                    res.sendStatus(404);
                });
        })
        .patch('/:taskId', function(req, res){
            taskService.updatePartialProject(req.params.taskId, req.body).then(
                function(result) {
                    res.sendStatus(204);
                },
                function(err) {
                    res.sendStatus(404);
                });
        })
        .delete('/:taskId', function(req, res){
            taskService.deleteTask(req.params.taskId).then(
                function(result){
                    res.sendStatus(204);
                },
                function(err){
                    res.sendStatus(404);
                });
        });

    return tasksRouter;
};

module.exports = routes;