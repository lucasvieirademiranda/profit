var loader = require('./application/loader');
var process = require('process');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
var express = require("express");
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var application = express();

mongodb.connect('mongodb://localhost:27017/profit', function (error, database) {

    if (error) throw error;

    global.database = database;
    global.objectId = objectId;

    application.use(bodyParser.json());
    application.use(bodyParser.urlencoded({ extended: true }));
    application.use(expressValidator([]));

    loader.start(application);

    var server = application.listen(process.env.PORT || 3000, function () {

        var host = server.address().address;
        var port = server.address().port;

        console.log("Profit is up on " + host + ":" + port);

    });

});