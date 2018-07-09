const mqtt        = require('mqtt')
const client      = mqtt.connect('mqtt://temp.adamrunner.com')

const Entry     = require('./entry');


client.on('connect', function () {
  client.subscribe('data')
})

client.on('message', function (topic, message) {
  // message is Buffer
  var messageString = message.toString()
  console.log(messageString)
  var entry = new Entry(messageString)
  entry.save()
})