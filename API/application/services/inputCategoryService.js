var inputCategoryRepository = require('../repositories/implementations/inputCategoryRepository');
var async = require('async');

exports.find = function (criteria, done) {

    inputCategoryRepository.find(criteria, done);

};

exports.list = function (criteria, projection, done) {

    inputCategoryRepository.list(criteria, projection, done);

};

exports.create = function (data, done) {

    async.waterfall(function (done) {

        inputCategoryRepository.find({ name: data.name }, done);

    }, function (inputCategory, done) {

        if (inputCategory) {
            done({
                code: 422,
                message: 'A categoria de entrada já existe!!'
            })
            return;
        }

        inputCategoryRepository.create(data, done);

    }, function (error, result) {

        if (error) {
            done(error, null);
            return;
        }

        done(null, result);

    });

};

exports.update = function (criteria, data, done) {

    async.waterfall(function (done) {

        inputCategoryRepository.find({
            _id: { $ne: data._id },
            name: data.name
        }, done);

    }, function (inputCategory, done) {

        if (inputCategory) {
            done({
                code: 422,
                message: 'A categoria de entrada já existe!!'
            }, null);
            return;
        }

        inputCategoryRepository.update(criteria, data, done);

    }, function (error, result) {

        if (error) {
            done(error, null);
            return;
        }

        done(null, result);

    });

};

exports.delete = function (criteria, done) {

    inputCategoryRepository.delete(criteria, done);

}