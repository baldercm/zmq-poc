'use strict'

const zmq = require('zmq')
const pub = zmq.socket('pub')

pub.bind('tcp://127.0.0.1:3000', function (err) {
  if (err) {
    console.error(err)
  }
  
  console.log('Publisher bound to port 3000')

  setInterval(function(){
    console.log('sending a multipart message envelope')
    pub.send(['kittens', 'meow!'])
  }, 5000)
})
