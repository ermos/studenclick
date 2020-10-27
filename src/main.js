import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "../public/static/css/main.scss"


Vue.component('v-tooltip', () => import('@/components/default/v-tooltip'))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
