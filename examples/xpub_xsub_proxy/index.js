'use strict'

const Promise = require('bluebird')
const zmq     = require('zmq')
Promise.promisifyAll(zmq)

const xpubEndpoint = process.env.XPUB_ENDPOINT || 'tcp://127.0.0.1:5501'
const xsubEndpoint = process.env.XSUB_ENDPOINT || 'tcp://127.0.0.1:5500'

console.log('XPUB endpoint: ' + xpubEndpoint)
console.log('XSUB endpoint: ' + xsubEndpoint)

const xpub = zmq.socket('xpub')
const xsub = zmq.socket('xsub')

xpub.bindAsync(xpubEndpoint)
  .then(function() {
    return xsub.bindAsync(xsubEndpoint)
  })
  .then(function() {
    zmq.proxy(xpub, xsub)
  })
  .catch(function(err) {
    console.error(err)
  })

function shutdown() {
  console.log('Shutting down...')
  xpub.close()
  xsub.close()
}

process.on('SIGTERM', shutdown) // docker stop
process.on('SIGINT' , shutdown) // ctrl-C
process.on('SIGUSR2', shutdown) // nodemon restart
