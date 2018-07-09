const MongoClient = require('mongodb').MongoClient;
const url         = 'mongodb://localhost:27017';
const dbName      = 'sensor_data';

const Mongo = function(){

}

Mongo.prototype.insertRecord = function(collection_name, attributes, responseCallback) {
  MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
    var db = client.db(dbName);
    db.collection(collection_name).insertOne(attributes, {}, responseCallback)
  });
}

Mongo.prototype.createEntry = function(attributes) {
  this.insertRecord('entries', attributes, function (error, response) {
    if (error) {
      console.log("Error saving!");
      console.log(error);
    } else {
      console.log(response);
    }
  });
}


module.exports = Mongo;