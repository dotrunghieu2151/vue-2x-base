import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import './plugins';

Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
