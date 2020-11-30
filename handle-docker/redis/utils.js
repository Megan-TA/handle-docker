// const { promisify } = require('util')

const client = require('./mqclient')

const pm2tips = `<pm2 id: ${process.env.NODE_APP_INSTANCE}>`

const TASK_NAME = 'queue'
const TASK_NAME_SET_FIRST = `${TASK_NAME}_SET_FIRST`
const TASK_NAME_BEGIN_TIME = `${TASK_NAME}_BEGIN_TIME`

exports.pm2tips = pm2tips
exports.TASK_NAME = TASK_NAME
exports.TASK_AMOUNT = 20
exports.TASK_NAME_TOTAL = `${TASK_NAME}_TOTAL`
exports.TASK_NAME_CUR_INDEX = `${TASK_NAME}_CUR_INDEX`
exports.TASK_NAME_SET_FIRST = TASK_NAME_SET_FIRST
exports.TASK_NAME_BEGIN_TIME = TASK_NAME_BEGIN_TIME

// 第二个参数1000代表timeout 超时后会返回nil
exports.popTask = async () => {
    const replay = await client.blpop(TASK_NAME, 1000)
    return replay[1]
}  

exports.setBeginTime = async (redlock) => {
    // 读取标记值前先锁住  redlock锁住的值必须要有locks的前缀
    const lock = await redlock.lock(`locks:${TASK_NAME_SET_FIRST}`, 1000)
    const setFirstVal = await client.get(TASK_NAME_SET_FIRST)

    if (setFirstVal !== 'true') {
        console.log(`${pm2tips} Get the first task!`)
        await client.set(TASK_NAME_SET_FIRST, 'true')
        await client.set(TASK_NAME_BEGIN_TIME, new Date().getTime())
    }
    await lock.unlock().catch(e => e)
}

exports.sleep = (timeout) => new Promise(resolve => setTimeout(resolve, timeout))