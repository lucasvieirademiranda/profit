var accountRepository = require('../repositories/implementations/accountRepository');
var async = require('async');

exports.find = function (criteria, done) {

    accountRepository.find(criteria, done);

};

exports.list = function (criteria, projection, done) {

    accountRepository.list(criteria, projection, done);

};

exports.create = function (data, done) {

    async.waterfall(function (done) {

        accountRepository.find({
            bank_id: data.bank_id,
            agency: data.agency,
            account: data.account
        }, done);

    }, function (account, done) {

        if (account) {
            done({
                code: 422,
                message: 'A conta informada já existe!!'
            }, null);
            return;
        }

        accountRepository.create(data, done);

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

        accountRepository.find({
            _id: { $ne: data._id },
            bank_id: data.bank_id,
            agency: data.agency,
            account: data.account
        }, done);

    }, function (account, done) {

        if (account) {
            done({
                code: 422,
                message: 'A conta informada já existe!!'
            }, null);
            return;
        }

        accountRepository.update(criteria, data, done);

    }, function (error, results) {

        if (error) {
            done(error, null);
            return;
        }

        done(null, results);
        
    });

};

exports.delete = function (criteria, done) {

    accountRepository.delete(criteria, done);

};