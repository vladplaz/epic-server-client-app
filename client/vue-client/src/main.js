import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import 'materialize-css/dist/js/materialize'
import 'materialize-css/dist/css/materialize.css'
import Notifications from 'vue-notification'

Vue.use(Notifications)
Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
