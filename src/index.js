import './less/index.less';
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './modules/landing';

Vue.use(VueRouter);
const router = new VueRouter({
  routes: routes,
  mode: 'history',
});
new Vue({ router }).$mount('#bootstrap');
