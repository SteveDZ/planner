/**
 * Created by stevedezitter on 20/03/16.
 */
var routes = function(boardService) {

    var express = require('express');
    var router = express.Router();

    var board1 = {
        _id: 1,
        project: 1,
        tasks : [
            {
                _id: 1,
                title: 'taakje 1',
                description: 'omschrijving taakje 1',
                status: 'NEW'
            },
            {
                _id: 2,
                title: 'taakje 2',
                description: 'omschrijving taakje 2',
                status: 'IN PROGRESS'
            }
        ]
    };

    router.get('/:boardId', function(req, res) {
        var boardId = req.params.boardId;
        console.log('board: ' + boardId);
        res.json(board1);
    });

    return router;
};

module.exports = routes;
