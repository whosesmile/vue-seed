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
import * as lib from './components';

Vue.use(VueRouter);

// 自动注册
Object.keys(lib).forEach(name => {
  Vue.component(`ex-${name.toLowerCase()}`, lib[name]);
});

const router = new VueRouter({
  mode: 'history',
  fallback: true,
  routes: [
    ...routes,
    { path: '*', component: lib.NoMatch },
  ],
});

new Vue({ store, router }).$mount('#bootstrap');
