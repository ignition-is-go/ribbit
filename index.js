
const amqp = require('amqplib/callback_api')
require('dotenv').config()

const {
  CONNECTION_STRING: connectionString,
  EXCHANGE_NAME: exchange, 
  EXCHANGE_TYPE: type,
  QUEUE_NAME: queue, 
  QUEUE_BINDING: binding

} = process.env

amqp.connect(connectionString, (error, connection) => {
  if(error){
    console.error(error)
  }
  connection.createChannel((error, channel) => {
    channel.assertQueue(queue, {
      durable: false
    })

    channel.assertExchange(exchange, type)

    channel.bindQueue(queue, exchange, binding)

    channel.consume(queue, (msg) => {
      channel.ack(msg)
      console.log(msg)
    })
  })
})