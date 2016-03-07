var userRepository = require('../repositories/implementations/userRepository');
var async = require('async');

exports.find = function (criteria, done) {

    userRepository.find(criteria, done);

};

exports.list = function (criteria, options, done) {

    userRepository.list(criteria, options, done);

};

exports.create = function (data, done) {

    async.waterfall([
        function (done) {

            userRepository.find({ email: data.email }, done);

        },
        function (user, done) {

            if (user)
            {
                done({
                    code: 422,
                    message: "O e-mail informado já existe!!"
                }, null);

                return;
            }

            userRepository.create(data, done);

        }
    ], function (error, result) {

        if (error) {
            done(error, null);
            return;
        }

        done(null, result);

    });

};

exports.update = function (criteria, data, done) {

    async.waterfall([
        function (done) {

            userRepository.find({ email: data.email }, done);

        },
        function (user, done) {

            if (user)
            {
                done({
                    code: 422,
                    message: "O e-mail informado já existe!!"
                }, null);

                return;
            }

            userRepository.update(criteria, data, done);

        }
    ], function (error, result) {

        if (error) {
            data(error, null);
            return;
        }

        done(null, result);

    });

};

exports.delete = function (criteria, done) {

    userRepository.delete(criteria, done);

};