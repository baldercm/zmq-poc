'use strict'

const zmq = require('zmq')

const pullEndpoint = process.env.PULL_ENDPOINT || 'tcp://127.0.0.1:5510'
const pushEndpoint = process.env.PUSH_ENDPOINT || 'tcp://127.0.0.1:5511'

console.log('PUSH endpoint: ' + pullEndpoint)
console.log('PULL endpoint: ' + pushEndpoint)

const pull = zmq.socket('pull').bind(pullEndpoint)
const push = zmq.socket('push').bind(pushEndpoint)

zmq.proxy(pull, push)

function shutdown() {
  console.log('Shutting down...')
  pull.close()
  push.close()
}

process.on('SIGTERM', shutdown) // docker stop
process.on('SIGINT' , shutdown) // ctrl-C
process.on('SIGUSR2', shutdown) // nodemon restart
