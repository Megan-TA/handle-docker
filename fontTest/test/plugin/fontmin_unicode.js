const through = require('through2')
const isTtf = require('is-ttf');
const TTFWriter = require('fonteditor-core').TTFWriter;
const ab2b = require('b3b').ab2b;
const fs = require('fs')

const { getRandom } = require('../utils')

// function listUnicode(unicode) {
//     return unicode.map(function (u) {
//         return '\\' + u.toString(16);
//     }).join(',');
// }

function map2json(item) {
    let obj = Object.create(null)

    for (let [k, v] of item) {
        obj[v.key] = v.value
    }
    return obj
}

module.exports = function (opts = {}) {
    return through.ctor({
        objectMode: true
    }, function (file, enc, cb) {
        // check null
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        // check stream
        if (file.isStream()) {
            cb(new Error('Streaming is not supported'));
            return;
        }

        // check ttf
        if (!isTtf(file.contents)) {
            cb(null, file);
            return;
        }
        

        // ttf obj
        var ttfObject = file.ttfObject || {
            name: {}
        };

        var filtered = ttfObject.glyf.filter(function (g) {
            return g.name !== '.notdef'
                && g.name !== '.null'
                && g.name !== 'nonmarkingreturn'
                && g.unicode && g.unicode.length;
        });
        
        const random = getRandom()

        const randomVal = random.getVal()
        

        const list = opts.text.split('').reduce((prev, now, index) => {
            prev.set(index, {
                key: now,
                value: ''
            })
            return prev
        }, new Map())

       
        filtered.forEach((filters, i) => {
       
            let unicode = filters.unicode[0]
            unicode += randomVal

            list.set(i, {
                key: list.get(i).key,
                value: '&#x' + unicode.toString(16) + ';'
            })

            filters.unicode[0] = unicode
        })

        random.clear()
      

        fs.writeFile(`./dist/a.json`, JSON.stringify(map2json(list)), {
            flag: "w"
        }, (err) => {
            if (err) {
                console.log(err)
                throw new Error(err)
            }
            console.log('写入json成功')
        })

        try {
            file.contents = ab2b(new TTFWriter({}).write(file.ttfObject))
            console.log('unicode成功')
        } catch(err) {
            console.log('unicode不成功', err)

            throw new Error(err)
        }
       
        cb(null, file)
        
    })
}