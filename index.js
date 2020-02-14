
const amqp = require('amqplib/callback_api')
require('dotenv').config()
const util = require('util')

const {
	CONNECTION_STRING: connectionString,
	EXCHANGE_NAME: exchange,
	EXCHANGE_TYPE: type,
	QUEUE_NAME: queue,
	QUEUE_BINDINGS: bindings

} = process.env

amqp.connect(connectionString, async (error, connection) => {
	if (error) {
		console.error(error)
	}
	connection.createChannel(async (error, channel) => {
		try {
			await channel.deleteQueue(queue)
		} catch { }

		await channel.assertQueue(queue, {
			durable: false
		})

		// await channel.assertExchange(exchange, type, durable:)

		bindings.split('|').map(binding =>
			channel.bindQueue(queue, exchange, binding)
		)

		channel.consume(queue, (msg) => {
			channel.ack(msg)
			try {
				const log = JSON.parse(msg.content.toString())
				// Output system version:
				try {
					console.log(`[${msg.fields.routingKey}]: ${util.inspect(log, false, 7, true)}`)
				} catch { }
			} catch {
				console.log(`\u001b[34m${msg.fields.routingKey}\u001b[0m`, msg.content.toString())
			}
			// LOGS VERSION
			// to add routing key : [${msg.fields.routingKey}]:\t
			// try {
			// 	console.log(`[${log.level}]:\t${log.message}`)
			// 	if (msg.fields.routingKey.includes('rest-connector')) {
			// 		console.log(log.data.body)
			// 	}
			// }
			// catch {
			// 	console.log(`[${msg.fields.routingKey}]:\t ${log}`)
			// }
		})
		console.log('Ready!\n')
	})
})