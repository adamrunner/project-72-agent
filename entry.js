const _           = require('lodash')
const Mongo       = require('./mongo')
const Entry = function(string) {
  this.mongo = new Mongo
  this.attributes = {};
  var _this = this;
  string.split(",").map(function(b) {
    var dataPair = b.split(":")
    dataPair[0]  = _.snakeCase(dataPair[0])
    if(dataPair[1].match(/^\d+/)){
      dataPair[1]  = parseFloat(dataPair[1])
    }
    _this.attributes[dataPair[0]] = dataPair[1]
  })

}

Entry.prototype.save = function() {
  _.extend(this.attributes, { created_at: new Date() })
  this.mongo.insertRecord(this.attributes);
}

module.exports = Entry;