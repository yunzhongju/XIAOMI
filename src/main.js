import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// xiaomi -> yarn add vant
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios';
Vue.prototype.$http = axios;
// 把axios 挂载到 vue的原型(共用方法)上 名称为$http
Vue.use(Vant);

Vue.config.productionTip = false

import { Lazyload } from 'vant';
import './assets/js/flexible.min.js'
// 弹性布局css
// options 为可选参数，无则不传
Vue.use(Lazyload);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
