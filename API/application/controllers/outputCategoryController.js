var express = require('express');
var router = express.Router();

var outputCategoryService = require("../services/outputCategoryService.js");

router.get('/find/:id', function(request, response) {

    var criteria = { _id: request.params.id };

    outputCategoryService.find(criteria, _done);

});

router.get("/list", function(request, response) {

    outputCategoryService.list({}, _done);

});

router.post("/create", function(request, response) {

    var data = {
        name: request.body.name,
        userId: request.body.userId
    };

    outputCategoryService.create(data, function(error, data) {

        if(error)
        {
            response.status(error.code)
                    .send(error);

            return;
        }

        response.status(200)
                .send(data);

    });

});

router.patch("/update/:id", function(request, response) {

    var criteria = { _id: request.params.id };

    var data = {
        _id: request.params.id,
        name: request.body.name,
        userId: request.body.userId
    };

    outputCategoryService.update(criteria, data, function(error, data) {

        if(error)
        {
            response.status(error.code)
                    .send(error);

            return;
        }

        response.status(200)
                .send(data);

    });

});

router.delete("/delete/:id", function(request, response) {

    var criteria = { _id: request.params.id };

    outputCategoryService.delete(criteria, function(error, data) {

        if(error)
        {
            response.status(error.code)
                    .send(error);

            return;
        }

        response.status(200)
                .send(data);

    });

});

module.exports = router;