# ribbit

## Setup

### Environment Variables

populate a `.env` file in the root with 

```bash
CONNECTION_STRING="amqp://[login]:[password]@[server-url]:5672"
EXCHANGE_NAME="[exchange-name]"
EXCHANGE_TYPE="[exchange-type]"
QUEUE_NAME="[queue-name]"
QUEUE_BINDINGS="[routing-matching pattern]|[second-pattern]" # e.g. '*.*.*.*' or '*.ribbit.#' split by | 
```

## Start

run`npm start`
