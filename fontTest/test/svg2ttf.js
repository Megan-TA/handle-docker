var fs = require('fs');
var svg2ttf = require('svg2ttf');
 
var ttf = svg2ttf(fs.readFileSync('./dist/YaHei.svg', 'utf8'), {});
fs.writeFileSync('myfont.ttf', Buffer.from(ttf.buffer));