var outputCategoryRepository = require('../repositories/implementations/outputRepository');
var async = require('async');

exports.find = function (criteria, done) {

    outputCategoryRepository.find(criteria, done);

};

exports.list = function (criteria, projection, done) {

    outputCategoryRepository.list(criteria, projection, done);

};

exports.create = function (data, done) {

    async.waterfall(function (done) {

        outputCategoryRepository.find({ name: data.name }, done);

    }, function (outputCategory, done) {

        if (outputCategory) {
            done({
                code: 422,
                message: 'A categoria de saída já existe!!'
            }, null);
            return;
        }

        outputCategory.create(data, done);

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

        outputCategoryRepository.find({
            _id: data._id,
            name: data.name
        }, done);

    }, function (outputCategory, done) {

        if (outputCategory) {
            done({
                code: 422,
                message: 'A categoria de saída já existe!!'
            }, null);
            return;
        }

        outputCategoryRepository.update(criteria, data, done);

    }, function (error, result) {

        if (error) {
            done(error, null);
            return;
        }

        done(null, result);

    });

};

exports.delete = function (criteria, done) {

    outputCategoryRepository.delete(criteria, done);

};