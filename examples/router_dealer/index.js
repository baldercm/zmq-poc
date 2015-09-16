'use strict'

const zmq = require('zmq')

const routerEndpoint = process.env.ROUTER_ENDPOINT || 'tcp://127.0.0.1:5433'
const dealerEndpoint = process.env.DEALER_ENDPOINT || 'tcp://127.0.0.1:5434'

console.log('Router endpoint: ' + routerEndpoint)
console.log('Dealer endpoint: ' + dealerEndpoint)

const router = zmq.socket('router')
const dealer = zmq.socket('dealer')

router.on('message', function() {
  let frames = new Array(arguments.length)
  for (let i = 0; i < frames.length; ++i) {
    frames[i] = arguments[i]
  }
  dealer.send(frames)
})

dealer.on('message', function() {
  let frames = new Array(arguments.length)
  for (let i = 0; i < frames.length; ++i) {
    frames[i] = arguments[i]
  }
  router.send(frames)
})

router.bind(routerEndpoint)
dealer.bind(dealerEndpoint)

function shutdown() {
  console.log('Shutting down...')
  router.close()
  dealer.close()
}

process.on('SIGTERM', shutdown) // docker stop
process.on('SIGINT' , shutdown) // ctrl-C
process.on('SIGUSR2', shutdown) // nodemon restart
