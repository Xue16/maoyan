import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import './assets/reset.css'
import '@/assets/iconfont/iconfont.css';
// import axios from 'axios'
// axios.defaults.baseURL = 'https://api.maoyan.com'
import Http from '@/utils/http.js'
Vue.prototype.$http = new Http()

new Vue({
  render: h => h(App)
}).$mount('#app')
