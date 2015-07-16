'use strict'
const fs   = require('fs')
const zmq  = require('zmq')
const pub  = zmq.socket('pub')
const path = process.argv[2]
  
fs.watch(path, function(){
  pub.send(JSON.stringify({
    type: 'changed',
    file: path,
    timestamp: Date.now()
  }))
})

pub.bind('tcp://*:5432', function(err) {
  if (err) {
    console.error(err)
  }
  console.log('Listening for zmq subscribers...')
})
