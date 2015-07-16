'use strict'

const zmq = require('zmq')
const sub = zmq.socket('sub')
const StringDecoder = require('string_decoder').StringDecoder
const decoder = new StringDecoder()

sub.connect('tcp://127.0.0.1:3000')
sub.subscribe('kittens')
console.log('Subscriber connected to port 3000')

sub.on('message', function(topic, message) {
  console.log('Received:', decoder.write(topic), 'containing message:', decoder.write(message))
})
