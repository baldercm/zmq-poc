/***
 * Excerpted from 'Node.js the Right Way',
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/jwnode for more book information.
***/
'use strict'
const
  zmq = require('zmq'),
  os = require('os'),
  filename = process.argv[2] || './sample.txt',
  // create request endpoint
  requester = zmq.socket('req')

// handle replies from responder
requester.on('message', function(data) {
  let response = JSON.parse(data)
  console.log('Received response:', response)
})

requester.connect('tcp://localhost:5433')

// send request for content
let numCpus = os.cpus().length
for (let i=1; i<=numCpus*3; i++) {
  console.log('Sending request ' + i + ' for ' + filename)
  requester.send(JSON.stringify({
    path: filename
  }))
}
