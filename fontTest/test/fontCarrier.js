var fontCarrier = require('font-carrier')

var transFont = fontCarrier.transfer('./font/YaHei.ttf')

transFont.min('0123456789')

transFont.output({
    path: './min/'
})