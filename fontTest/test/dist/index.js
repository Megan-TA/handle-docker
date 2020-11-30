// import App from './App.vue'
// import ajson from './a.json'


const ajson = 
{"0":"&#x4df7;","1":"&#x36dd;","2":"&#x41e6;","3":"&#x2c23;","4":"&#x2a16;","5":"&#x3f93;","6":"&#x3d8d;","7":"&#x363a;","8":"&#x4c57;","9":"&#x2bd0;"}



new Vue({
    el: '#app',
    template: `
        <div class="myfont s">   
            这是字体的数字：<span v-html="convertToUnicode('0123456789s')"></span>
        </div>
    `,
    methods: {
        convertToUnicode(num) {
            let result = ''
            num = String(num)
            let len = num.length
            for(let i = 0; i < len; i ++) {

                result += ajson[num.charAt(i)] || num.charAt(i)
            }
            return result
        }
    }

    
})
