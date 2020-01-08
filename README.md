# ribbit

## Setup

### Environment Variables

populate a `.env` file in the root with 

```
CONNECTION_STRING="amqp://{{login}}:{{password}}@{{serverUrl}}:5672"
EXCHANGE_NAME="{{exchangeName}}"
QUEUE_NAME="{{queueName}}"
```

## Start

run `npm start`
