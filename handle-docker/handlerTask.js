const Redlock = require('redlock');

const { 
    popTask,
    setBeginTime,
    sleep,
    pm2tips,
    TASK_NAME_TOTAL,
    TASK_NAME_CUR_INDEX,
    TASK_NAME_BEGIN_TIME,
    TASK_NAME_SET_FIRST
} = require('./redis/utils')
const client = require('./redis/mqclient')

const redlock = new Redlock([client], {
    retryCount: 100,
    retryDelay: 200
})

async function handleTask(task) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`${pm2tips} Handleing ${task}...`)
            resolve()
        }, 2000)
    })
}

async function taskStart() {
    let curIndex= Number(await client.get(TASK_NAME_CUR_INDEX))
    const taskAmount = Number(await client.get(TASK_NAME_TOTAL))
    console.log('curIndex：', curIndex)
    // 等待新的tasks
    if (taskAmount === 0) {
        console.log(`${pm2tips} wating new tasks`)
        await sleep(2000)
        await taskStart()
        return
    }

    // 队列处理完 统计任务总耗时
    if (curIndex === taskAmount) {
        const beginTime = Number(await client.get(TASK_NAME_BEGIN_TIME))

        const duration = new Date().getTime() - beginTime
        console.log(`${pm2tips} All tasks were completed! durating: ${duration}ms.`)

        await client.set(TASK_NAME_BEGIN_TIME, '0')
        await client.set(TASK_NAME_TOTAL, '0')
        await client.set(TASK_NAME_CUR_INDEX, '0')
        await client.set(TASK_NAME_SET_FIRST, 'false')
        await sleep(2000)
        await taskStart()
        return
    }

    // 记录任务开始时时间
    await setBeginTime(redlock)

    const result = await popTask()
    await handleTask(result);

    try {
        const lock = await redlock.lock(`locks:${TASK_NAME_CUR_INDEX}`, 1000)
        curIndex = await client.get(TASK_NAME_CUR_INDEX)
        await client.set(TASK_NAME_CUR_INDEX, ++curIndex)
        await lock.unlock().catch(e => e)
    } catch (e) {
        console.log(e)
    }

    await taskStart()
}


module.exports = taskStart