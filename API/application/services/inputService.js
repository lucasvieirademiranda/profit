var inputRepository = require('../repositories/implementations/inputRepository');
var async = require('async');

exports.find = function(criteria, done) {
    
    inputRepository.find(criteria, done);
    
};

exports.list = function() {
    
};

exports.create = function (data, done) {

    inputRepository.create(data, done);

};

exports.update = function (criteria, data, done) {

    inputRepository.update(criteria, data, done);

};

exports.delete = function(criteria, done) {
    
    inputRepository.delete(criteria, done);
    
};