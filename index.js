require('dotenv').config()
const api_user     = process.env.API_USER
const api_password = process.env.API_PASSWORD
const api_url      = process.env.API_URL
const mqtt_host    = process.env.MQTT_HOST
if(api_user === undefined || api_password === undefined || mqtt_host === undefined || mqtt_host === undefined){
  throw "Missing required environment variables"
}

const mqtt     = require('mqtt')
const client   = mqtt.connect(`mqtt://${mqtt_host}`)
const AuthApi  = require('./auth_api');
const EntryApi = require('./entry_api');
const Entry    = require('./entry');
const Message  = require('./message');

var authApi = new AuthApi({user: api_user, password: api_password})

client.on('connect', function () {
  client.subscribe('data')
})

client.on('message', function (topic, message) {
  // message is Buffer
  var messageObject = new Message(message.toString());
  console.log(messageObject.string)

  var entry = new Entry(messageObject.attributes)
  entry.save()

  var entryApi = new EntryApi(messageObject.attributes, authApi)
  entryApi.send()
})