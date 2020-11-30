function getRandom (range = 63000) {
    const records = []

    return {
        getVal() {
            let currentVal = Math.floor(Math.random() * 100 + range)
            while (records.includes(currentVal))  {
                currentVal = Math.floor(Math.random() * 100 + range)
            }
            records.push(currentVal)
            return currentVal
        },
        clear() {
            records.length = 0
            return 
        }
    }
}

exports.getRandom = getRandom