'use strict'

const zmq   = require('zmq')
const path  = process.argv[2]
const req   = zmq.socket('req')

req.on('message', function(data) {
  let response = JSON.parse(data)
  console.log('Received response:', response)
  req.close()
})
req.connect('tcp://localhost:5433')

console.log('Sending request for ' + path)
req.send(JSON.stringify({
  path: path
}))
