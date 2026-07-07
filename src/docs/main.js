import Vue from 'vue';
import VueRouter from 'vue-router';
import ZkUI from '../index';
import App from './App.vue';
import { createRouter } from './router';
import './styles.css';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ZkUI);

const router = createRouter(VueRouter);

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');
