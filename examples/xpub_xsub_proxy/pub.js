'use strict'

const zmq  = require('zmq')

const xsubEndpoint = process.env.XSUB_ENDPOINT || 'tcp://127.0.0.1:5500'

const pub  = zmq.socket('pub').connect(xsubEndpoint)

for (let i = 1; i <= 100; i++) {
  console.log('Publishing ' + i)
  pub.send(JSON.stringify({
    value: i,
  }))
}
