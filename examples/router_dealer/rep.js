'use strict'

const zmq = require('zmq')

let rep = zmq.socket('rep').connect('tcp://127.0.0.1:5434')

rep.on('message', function(data) {
  let request = JSON.parse(data)
  console.log(process.pid + ' received request: ' + request.value)

  console.log(process.pid + ' sending response')
  rep.send(JSON.stringify({
    result: 2 * request.value
  }))
})

function shutdown() {
  console.log('Shutting down...')
  rep.close()
}

process.on('SIGTERM', shutdown) // docker stop
process.on('SIGINT' , shutdown) // ctrl-C
process.on('SIGUSR2', shutdown) // nodemon restart