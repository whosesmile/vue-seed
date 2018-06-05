// import polyfill
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

// 工具方法
// AbCdEf => ab-cd-ef
const kebabCase = str => str.replace(/([A-Z])/g, s => '-' + s.toLowerCase()).replace(/^-/, '');

// 自动注册
Object.keys(lib).forEach(name => {
  Vue.component(`ex-${kebabCase(name)}`, lib[name]);
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
