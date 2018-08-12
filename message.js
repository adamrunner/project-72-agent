const _       = require('lodash');
const Message = function(string) {
  this.string     = string;
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

module.exports = Message;