const opentype = require('opentype.js')


opentype.load('./font/YaHei.ttf', (err, font) => {
    console.log(font.glyphs.glyphs[6])
})