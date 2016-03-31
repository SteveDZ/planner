/**
 * Created by stevedezitter on 15/03/16.
 */
var routes = function(userService) {
    var express = require('express');

    var userRouter = express.Router();

    userRouter
        .get('/', function(req, res) {
            userService.findAll().then(
                function(users){
                    res.status(200).json(users);
                },
                function(err){
                    res.sendStatus(404);
                });
        })
        .get('/:userId', function(req, res){
            userService.findUserById(req.params.userId).then(
                function(user) {
                    res.status(200).json(user);
                },
                function(err) {
                    res.sendStatus(401);
                }
            );
        })
        .post('/', function(req, res) {
            userService.createUser(req.body).then(
                function(result) {
                    res.set('Location', 'http://' + req.headers.host + '/api/user/' + result.insertedId);
                    res.sendStatus(201);
                },
                function() {
                    res.sendStatus(500);
                }
            );
        })
        .put('/:userId', function(req, res) {
            userService.updateUser(req.params.userId, req.body).then(
                function(result) {
                    res.sendStatus(204);
                },
                function(err) {
                    res.sendStatus(404);
                }
            );
        })
        .patch('/:userId', function(req, res) {
            userService.updatePartialUser(req.params.userId, req.body).then(
                function(result) {
                    res.sendStatus(204);
                },
                function(err) {
                    res.sendStatus(404);
                }
            );
        })
        .delete('/:userId', function(req, res) {
            userService.deleteUser(req.params.userId).then(
                function(result) {
                    res.sendStatus(204);
                },
                function(err) {
                    res.sendStatus(404);
                }
            );
        });

    return userRouter;
};

module.exports = routes;