const _           = require('lodash')
const Mongo       = require('./mongo')
const Entry = function(attributes) {
  this.mongo      = new Mongo
  this.attributes = attributes;
}

Entry.prototype.save = function() {
  _.extend(this.attributes, { created_at: new Date() })
  this.mongo.insertRecord('entries', this.attributes)
}

module.exports = Entry;