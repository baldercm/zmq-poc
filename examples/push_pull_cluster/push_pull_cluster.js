'use strict'

const cluster = require('cluster')
const fs = require('fs')
const zmq = require('zmq')
const StringDecoder = require('string_decoder').StringDecoder
const decoder = new StringDecoder()

if (cluster.isMaster) {
  let
    push = zmq.socket('push').bind('ipc://push.ipc'),
    pull = zmq.socket('pull').bind('ipc://pull.ipc'),
    workers = 0
    
  pull.on('message', function (msg) {
    msg = decoder.write(msg)
    if (msg === 'ready') {
      workers++
      if (workers === 3) {
        for (let i = 0; i<30; i++) {
          push.send(i)
        }
      }
    } else {
      console.log('Job result: ' + msg)
    }
  })
  
  // listen for workers to come online
  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online.')
  })
  
  for (let i = 0; i < 3; i++) {
    cluster.fork()
  }
} else {
  let
    pull = zmq.socket('pull').connect('ipc://push.ipc'),
    push = zmq.socket('push').connect('ipc://pull.ipc')
    
  pull.on('message', function (msg) {
    console.log('Pulled job ' + msg)
    fs.readFile('file.txt', function(err, content) {
      push.send(JSON.stringify({
        jobId: parseInt(decoder.write(msg)),
        content: content.toString(),
        timestamp: Date.now(),
        pid: process.pid
      }))
    })
  })
  
  push.send('ready')
}
