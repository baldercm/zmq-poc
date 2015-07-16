'use strict'

const fs = require('fs')
const zmq = require('zmq')
const rep = zmq.socket('rep')

rep.on('message', function(data) {
  let request = JSON.parse(data)
  console.log('Received request to get: ' + request.path)
  fs.readFile(request.path, function(err, content) {
    console.log('Sending response content')
    rep.send(JSON.stringify({
      content: content.toString(),
      timestamp: Date.now(),
      pid: process.pid
    }))
  })
})

rep.bind('tcp://127.0.0.1:5433', function(err) {
  if (err) {
    console.error(err)
  }
  console.log('Listening for zmq requesters...')
})

process.on('SIGINT', function() {
  console.log('Shutting down...')
  rep.close()
})
