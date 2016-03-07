var ObjectId = require('mongodb').ObjectId;
var _database = global.database;
var _collectionName = null;

exports.setCollection = function (collectionName) {
    _collectionName = collectionName;
};

exports.getCollection = function () {
    return _collectionName;
};

exports.find = function (criteria, done) {

    var collection = _database.collection(_collectionName);

    collection.findOne(criteria, function (error, document) {

        if (error)
        {
            done({
                codigo: 500,
                mensagem: "Não foi possível acessar a base de dados!!"
            }, null);
            
            return;
        }

        done(null, document);

    });

};

exports.create = function (document, done) {

    document._id = ObjectId().toString();

    var collection = _database.collection(_collectionName);

    collection.insertOne(document, function (error, document) {

        if (error)
        {
            done({
                codigo: 500,
                mensagem: "Não foi possível acessar a base de dados!!"
            }, null);
            
            return;
        }

        done(null, document);

    });

};

exports.list = function (criteria, projection, done) {

    var collection = _database.collection(_collectionName);

    collection.find(criteria, projection, function (error, documents) {

        if (error)
        {
            done({
                codigo: 500,
                mensagem: "Não foi possível acessar a base de dados!!"
            }, null);
            
            return;
        }

        done(null, documents);

    });

};

exports.update = function (criteria, document, done) {

    var collection = _database.collection(_collectionName);

    collection.replaceOne(criteria, document, function (error, document) {

        if (error)
        {
            done({
                codigo: 500,
                mensagem: "Não foi possível acessar a base de dados!!"
            }, null);
            
            return;
        }

        done(null, document);

    });

};

exports.delete = function (criteria, done) {

    var collection = _database.collection(_collectionName);

    collection.deleteOne(criteria, function (error, document) {

        if (error)
        {
            done({
                codigo: 500,
                mensagem: "Não foi possível acessar a base de dados!!"
            }, null);
            
            return;
        }

        done(null, document);

    });

};