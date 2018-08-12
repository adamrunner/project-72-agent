const _ = require('lodash')
const request = require('request')
const EntryApi = function(attributes, auth_api){
  // TODO: check environment variable
  this.endpoint   = "http://localhost:3000/entries"
  this.attributes = attributes
  this.auth_api   = auth_api
}

EntryApi.prototype.send = function(){
  request({
    uri: this.endpoint,
    method: "POST",
    json: this.attributes,
    auth: {
      bearer: this.auth_api.token
    }

  }, this.handleEntryRepsonse.bind(this))
}

EntryApi.prototype.handleEntryRepsonse = function (error, response, body){
  if(response.statusCode == 401){
    this.auth_api.send()
    this.send()
  }
  this.error= error
  this.response= response
  this.body= body
}

module.exports = EntryApi;