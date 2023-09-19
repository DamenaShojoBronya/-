import App from './App'
Vue.prototype.$eventHub = new Vue();

// #ifndef VUE3
import Vue from 'vue'
import util from '@/config.js'
Vue.prototype.$util = util;
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// import uView from "uview-ui";
// Vue.use(uView);
// #endif

