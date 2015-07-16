'use strict'

const zmq = require('zmq')
const sub = zmq.socket('sub')

sub.subscribe('')
sub.on('message', function(data) {
  let message = JSON.parse(data), date = new Date(message.timestamp)
  console.log('File "' + message.file + '" changed at ' + date)
})
sub.connect('tcp://localhost:5432')
