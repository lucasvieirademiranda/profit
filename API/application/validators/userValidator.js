var express = require('express');
var router = express.Router();

router.use('/create', function (request, response, next) {

    /*request.checkBody('name', '').notEmpty();

    request.checkBody('email', '').notEmpty();
    request.checkBody('email', '').isEmail();

    request.checkBody('birthday', '').notEmpty();
    request.checkBody('birthday', '').isDate();

    request.checkBody('password', '').notEmpty();

    request.checkBody('confirmation', '').notEmpty();
    request.checkBody('confirmation', '').equals(request.body.password);

    var errors = request.validationErrors();

    if (errors) {
        response.status(400)
            .send(errors);
        return;
    }*/

    next();

});

router.use('/update', function (request, response, next) {

    /* request.checkBody('name', '').notEmpty();

    request.checkBody('email', '').notEmpty();
    request.checkBody('email', '').isEmail();

    request.checkBody('birthday', '').notEmpty();
    request.checkBody('birthday', '').isDate();

    request.checkBody('password', '').notEmpty();

    request.checkBody('confirmation', '').notEmpty();
    request.checkBody('confirmation', '').equals(request.body.password);

    var errors = request.validationErrors();

    if (errors) {
        response.status(400)
            .send(errors);
        return;
    } */

    next();

});

module.exports = router;