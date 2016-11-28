var express = require('express');
var router = express.Router();

var userService = require('../services/userService.js');

router.get('/find/:id', function (request, response) {

    var criteria = { _id: request.params.id };

    userService.find(criteria, function (error, data) {

        if (error)
        {
            response.status(error.code)
                    .send(error);
            
            return;
        }

        response.status(200)
            .send(data);

    });

});

router.get('/list', function (request, response) {

    var criteria = {};

    var projection = {};

    userService.list(criteria, projection, function(error, data) {
        
        if (error) 
        {
            response.status(error.code)
                    .send(error);
            
            return;
        }

        response.status(200)
            .send(data);

    });

});

router.post('/create', function (request, response) {

    var data = {
        name: request.body.name,
        email: request.body.email,
        birthday: request.body.birthday,
        password: request.body.password
    };

    userService.create(data, function (error, data) {
        
        if (error) 
        {
            response.status(error.code)
                    .send(error);
            
            return;
        }

        response.status(200)
            .send(data);
            
    });

});

router.patch('/update/:id', function (request, response) {

    var criteria = { _id: request.params.id };
    
    var data = {
        _id: request.params.id,
        name: request.body.name,
        email: request.body.email,
        birthday: request.body.birthday,
        password: request.body.password
    };
    
    userService.update(criteria, data, function(error, data) {
       
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

router.delete('/delete/:id', function (request, response) {

    var criteria = { _id: request.params.id };

    userService.delete(criteria, function(error, data) {
        
        if (error)
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