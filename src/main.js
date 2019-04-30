import Vue from 'vue'
import App from './App.vue'
import router from './router'
import PortalVue from 'portal-vue'

require('./assets/sass/main.scss');

export const EventBus = new Vue();

Vue.config.productionTip = false
Vue.use(PortalVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')