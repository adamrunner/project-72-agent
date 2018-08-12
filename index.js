const mqtt     = require('mqtt')
const client   = mqtt.connect('mqtt://temp.adamrunner.com')
const AuthApi  = require('./auth_api');
const EntryApi = require('./entry_api');
const Entry    = require('./entry');
const Message  = require('./message');

var authApi = new AuthApi({user: 'mqttjs@adamrunner.com', password: 'boarding'})

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