var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var MongoDbFactory = function() {
    var db;
    var mongoOptions = {
        db: {
            native_parser: false
        },
        server: {
            auto_reconnect: true,
            poolSize : 5,
            socketOptions: {
                connectTimeoutMS: 500
            }
        },
        replSet: {},
        mongos: {}
    };

    MongoClient.connect("mongodb://localhost:27017/plannerDb", mongoOptions, function(err, database) {
        console.log(err);
        assert(err, null);
        db = database;
    });

    var getInstance = function() {
        return db;
    };

    return {
        getInstance: getInstance
    }
}();

module.exports = MongoDbFactory;