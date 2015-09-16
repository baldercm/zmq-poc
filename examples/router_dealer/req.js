'use strict'

const zmq = require('zmq')

const routerEndpoint = process.env.ROUTER_ENDPOINT || 'tcp://127.0.0.1:5433'

let req = zmq.socket('req').connect(routerEndpoint)

req.on('message', function(data) {
  let response = JSON.parse(data)
  console.log('Received response:', response)
})

for (let i=1; i<=100; i++) {
  console.log('Sending request ' + i)
  req.send(JSON.stringify({
    value: i
  }))
}

function shutdown() {
  console.log('Shutting down...')
  req.close()
}

process.on('SIGTERM', shutdown) // docker stop
process.on('SIGINT' , shutdown) // ctrl-C
process.on('SIGUSR2', shutdown) // nodemon restart