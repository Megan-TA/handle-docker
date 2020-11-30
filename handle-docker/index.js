const taskStart = require('./handlerTask')
const client = require('./redis/mqclient')

client.on('connect', async () => {
    console.log('Redis is connected!')
})

client.on('ready', async () => {
    console.log('Redis is ready!')
    await taskStart()
})

client.on('error', error => {
    console.log('Redis is error!' + error)
})