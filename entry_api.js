const _ = require('lodash')
const request = require('request')
const EntryApi = function(attributes, auth_api){
  this.auth_api = auth_api
  var api_url = process.env.API_URL
  this.endpoint   =  `${api_url}/entries`

  this.attributes = attributes
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