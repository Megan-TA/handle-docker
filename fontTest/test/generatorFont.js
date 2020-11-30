const Fontmin = require('fontmin')
const opentypejs = require('opentype.js')

const unicodePlugin = require('./plugin/fontmin_unicode')
const { getRandom } = require('./utils')

const random = getRandom()


async function splitFont(i, platform) {
    // './font/PingFang-SC-Regular.ttf'
    const path = platform == 'ios' ? './font/PingFang-SC-Regular.ttf' : './font/YaHei.ttf'
    const text = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const fontmin = new Fontmin()
                .src(path)
                .use(Fontmin.glyph({
                    text
                }))
                .use(unicodePlugin({
                    text
                }))
                .use(Fontmin.css({
                    base64: false, 
                    glyph: true,   
                    iconPrefix: 'my-icon', 
                    fontFamily: 'myfont',
                    asFileName: false,
                    local: false,
                }))
                .use(Fontmin.ttf2eot()) 
                .use(Fontmin.ttf2woff())
                .use(Fontmin.ttf2svg())
                .dest(`./dist/${i}`)
        
    try {
        await fontmin.run()
        console.log('run执行成功~')
    } catch(err) {
        console.log(err)
    }
    
}

async function step(i, platform) {
    await splitFont(i, platform)
}

// exports.generatorFont = generatorFont
exports.getRandom = getRandom
exports.step = step
