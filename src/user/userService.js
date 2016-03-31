/**
 * Created by stevedezitter on 15/03/16.
 */
var userService = function(db) {

    var ObjectID = require('mongodb').ObjectID;

    var USER_COLLECTION = 'users';

    var createUserObjectID = function(userId) {
        return new ObjectID(userID);
    }

    var findAll = function() {
        return db.collection(USER_COLLECTION).find({}).toArray();
    };

    var findUserById = function(userId) {
        return db.collection(USER_COLLECTION).find({_id: createUserObjectID(userId)});
    };

    var createUser = function(user) {
        return db.collection(USER_COLLECTION).insertOne(user);
    };

    var updateUser = function(userId, user) {
        return db.collection(USER_COLLECTION).replaceOne({_id: createUserObjectID(userId)}, user);
    };

    var updatePartialUser = function(userId, partialUser) {
        return db.collection(USER_COLLECTION).updateOne({_id: createUserObjectID(userId)}, {$set: partialUser});
    };

    var deleteUser = function(userId) {
        return db.collection(USER_COLLECTION).deleteOne({_id: createUserObjectID(userId)});
    };

    return {
        findAll: findAll,
        findUserById: findUserById,
        createUser: createUser,
        updateUser: updateUser,
        updatePartialUser: updatePartialUser,
        deleteUser: deleteUser
    }
};

module.exports = userService;