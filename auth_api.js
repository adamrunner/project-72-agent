const _ = require('lodash')
const request = require('request')
const AuthApi = function(attributes){
  this.attributes = attributes
  this.send()
}

AuthApi.prototype.send = function(){
  request({
    url:  "http://localhost:3000/auth",
    method: "POST",
    json: this.attributes
  },this.handleAuthResponse.bind(this) )
}

AuthApi.prototype.handleAuthResponse = function(error, response, body){
  if(error){
    console.log(error);
    throw "Error during authentication process"
  }else{
    this.token = body.token
  }
}

module.exports = AuthApi