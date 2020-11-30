const opentype = require('opentype.js')

opentype.load('./fonteditor.ttf', (err, font) => {
    console.log(font)
})