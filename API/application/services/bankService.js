var bankRepository = require('../implementations/bankRepository');
var async = require('async');

exports.find = function (criteria, done) {

    bankRepository.find(criteria, done);
    
};

exports.list = function(criteria, projection, done) {
    
    bankRepository.list(criteria, projection, done);
    
};

exports.create = function (data, done) {

    async.waterfall(function (done) {

        bankRepository.find({ code: data.code }, done);

    }, function (bank, done) {

        if (bank) {
            done({
                code: 422,
                message: 'O código informado já existe!!'
            }, null);

            return;
        }

        bankRepository.find({ name: data.name }, done);

    }, function (bank, done) {

        if (bank) {
            done({
                code: 422,
                message: 'O nome informado já existe!!'
            }, null);

            return;
        }

        bankRepository.create(data, done);

    }, function (error, results) {

        if (error) {
            done(error, null);
            return;
        }

        done(null, results);

    });


};

exports.update = function (criteria, data, done) {

    async.waterfall(function (done) {

        bankRepository.find({ code: data.code }, done);

    }, function (bank, done) {

        if (bank) {
            done({
                code: 422,
                message: 'O código informado já existe!!'
            }, null);

            return;
        }

        bankRepository.find({ name: data.name }, done);

    }, function (bank, done) {

        if (bank) {
            done({
                code: 422,
                message: 'O nome informado já existe!!'
            }, null);

            return;
        }

        bankRepository.update(criteria, data, done);

    }, function (error, results) {

        if (error) {
            done(error, null);
            return;
        }

        done(null, results);

    });

};

exports.delete = function (criteria, done) {

    bankRepository.delete(criteria, done);

};