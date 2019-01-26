import Vue from 'vue';
import Input from './vue-tsx/Input';
new Vue({
    template: '<div>输入:<Input value="" @input="input"/><br/> 输入内容：{{message}}</div> ',
    data:{
        message:'hello Vue!'
    },
    methods:{
        input:function(e) {
           this.message = e.target.value;  
        }
    }
  }).$mount('#app');