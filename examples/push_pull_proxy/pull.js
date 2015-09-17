'use strict'

const zmq = require('zmq')

const pushEndpoint = process.env.PUSH_ENDPOINT || 'tcp://127.0.0.1:5511'

const pull = zmq.socket('pull').connect(pushEndpoint)

pull.on('message', function(data) {
  let message = JSON.parse(data)
  console.log('Received pull ' + message.value)
})
