const child_process = require('child_process')

const worker = child_process.exec('python3 ttf2xml.py 1', (err, stdout, stderr) => {
    if (err) {
        console.log(err)
    }
    console.log('stdout: ', stdout)
    console.log('stderr: ', stderr)

})

worker.on('exit', (code) => {
    console.log('子进程已退出，退出码 ' + code)
})