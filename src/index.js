// import necessary polyfill
import 'core-js/es6/array';
import 'core-js/es6/string';
import 'core-js/es6/promise';

// import business
import './less/index.less';
import './utils/axios';
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './ducks';
import { routes } from './schema';
import App from './components/app';
import NoMatch from './components/nomatch';

Vue.use(VueRouter);
Vue.component('app', App);

const router = new VueRouter({
  mode: 'history',
  fallback: true,
  routes: [
    ...routes,
    { path: '*', component: NoMatch },
  ],
});

new Vue({ store, router }).$mount('#bootstrap');
