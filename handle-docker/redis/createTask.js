const { 
    TASK_NAME,
    TASK_AMOUNT,
    TASK_NAME_BEGIN_TIME,
    TASK_NAME_SET_FIRST,
    TASK_NAME_CUR_INDEX,
    TASK_NAME_TOTAL
} = require('./utils') 
const client = require('./mqclient')

client.on('ready', async () => {
    await client.del(TASK_NAME)

    for (let i = 1; i <= TASK_AMOUNT; i++) {
        client.lpush(TASK_NAME, `task-${i}`)
    }

    await client.set(TASK_NAME_SET_FIRST, 'false')
    await client.set(TASK_NAME_TOTAL, `${TASK_AMOUNT}`)
    await client.set(TASK_NAME_CUR_INDEX, '0')
    await client.set(TASK_NAME_BEGIN_TIME, '0')

    const replay = await client.lrange(TASK_NAME, 0, -1)

    console.log(replay)

    process.exit()
})