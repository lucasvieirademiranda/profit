var cluster = require("cluster");
var os = require("os");

if(cluster.isMaster)
{
    var numberOfWorkers = os.cpus().length;

    for(var i = 0; i < numberOfWorkers; i++)
        cluster.fork();

    cluster.on("online", function(worker) {
        console.log('A worker with pid:' + worker.process.pid + ' has been started');
    });

    cluster.on("exit", function(worker, code, signal) {
        console.log('A worker with pid: ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker...');
        cluster.fork();
    });

}
else
{
    var loader = require('./application/loader');
    var process = require('process');
    var mongodb = require('mongodb').MongoClient;
    var objectId = require('mongodb').ObjectId;
    var bodyParser = require('body-parser');
    var expressValidator = require('express-validator');
    var http = require("http");
    var express = require("express");
    var application = express();

    mongodb.connect('mongodb://localhost:27017/profit', function (error, database) {

        if (error) throw error;

        global.database = database;
        global.objectId = objectId;

        application.use(bodyParser.json());
        application.use(bodyParser.urlencoded({ extended: true }));
        application.use(expressValidator([]));

        loader.start(application);

        http.createServer(application)
            .listen(3000, "localhost");

    });

}