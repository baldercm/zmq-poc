'use strict'

const zmq  = require('zmq')

const pullEndpoint = process.env.PULL_ENDPOINT || 'tcp://127.0.0.1:5510'

const push = zmq.socket('push').connect(pullEndpoint)

for (let i = 1; i <= 1000000; i++) {
  console.log('Pushing ' + i)
  push.send(JSON.stringify({
    value: i,
  }))
}
