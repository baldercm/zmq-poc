'use strict'

const zmq = require('zmq')

const xpubEndpoint = process.env.XPUB_ENDPOINT || 'tcp://127.0.0.1:5501'

const sub = zmq.socket('sub').connect(xpubEndpoint)

sub.subscribe('')
sub.on('message', function(data) {
  let message = JSON.parse(data)
  console.log('Received subscribe ' + message.value)
})
