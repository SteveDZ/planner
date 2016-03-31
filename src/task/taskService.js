/**
 * Created by stevedezitter on 15/03/16.
 */
var taskService = function(db) {

    var ObjectID = require('mongodb').ObjectID;

    var TASK_COLLECTION = 'tasks';

    var findAll = function() {
        return db.collection(TASK_COLLECTION).find({}).toArray();
    };

    var findTaskById = function(taskId) {
        var taskObjectId = new ObjectID(taskId);
        return db.collection(TASK_COLLECTION).find({_id: taskObjectId}).limit(1).toArray();
    };

    var createTask = function(task) {
        return db.collection(TASK_COLLECTION).insertOne(task);
    };

    var updateTask = function(taskId, task) {
        var taskObjectId = new ObjectID(taskId);
        return db.collection(TASK_COLLECTION).replaceOne({_id: taskObjectId}, task);
    };

    var updatePartialTask = function(taskId, task) {
        var taskObjectId = new ObjectID(taskId);
        return db.collection(TASK_COLLECTION).updateOne({_id: taskObjectId}, {$set: task});
    };

    var deleteTask = function(taskId) {
        var taskObjectId = new ObjectID(taskId);
        return db.collection(TASK_COLLECTION).deleteOne({_id: taskObjectId});
    };

    return {
        findAll: findAll,
        findTaskById: findTaskById,
        createTask: createTask,
        updateTask: updateTask,
        updatePartialTask: updatePartialTask,
        deleteTask: deleteTask
    }
};

module.exports = taskService;