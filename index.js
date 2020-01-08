
const amqp = require('amqplib/callback_api')
require('dotenv').config()

const {
  CONNECTION_STRING: connectionString,
  EXCHANGE_NAME: exchangeName
} = process.env

amqp.connect(connectionString, (error, connection) => {
  if(error){
    console.error(error)
  }

  const queue = 'ribbit'
  connection.createChannel((error, channel) => {
    channel.assertQueue(queue, {
      durable: false
    })

    channel.assertExchange(exchangeName, 'topic')

    channel.bindQueue(queue, exchangeName, "#")

    channel.consume(queue, (msg) => {
      console.log(msg)
    })
  })
})