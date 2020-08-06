import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.mixin({
    methods: {
        checkUndefined: function(value, defValue) {
            return value === undefined ? defValue : value
        }
    }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
