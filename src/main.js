import Vue from 'vue'
import App from './App.vue'
import router from  './router/index'

Vue.config.productionTip = false
import './assets/reset.css'
import '@/assets/iconfont/iconfont.css';
// import axios from 'axios'
// axios.defaults.baseURL = 'https://api.maoyan.com'
import Http from '@/utils/http.js'
Vue.prototype.$http = new Http()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
