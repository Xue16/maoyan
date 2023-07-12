import Vue from 'vue'
import App from './App.vue'
import router from  './router/index'
import store from './store'

Vue.config.productionTip = false
import './assets/reset.css'
import './assets/maoyan.css'
import '@/assets/iconfont/iconfont.css';
// import axios from 'axios'
// axios.defaults.baseURL = 'https://api.maoyan.com'
import Http from '@/utils/http.js'
import 'animate.css'
Vue.prototype.$http = new Http()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
