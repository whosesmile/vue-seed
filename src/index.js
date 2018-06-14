// import polyfill
import 'core-js/es6/array';
import 'core-js/es6/string';
import 'core-js/es6/promise';

// import business
import './less/index.less';
import './utils/axios';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import store from './ducks';
import { routes } from './schema';
import * as lib from './components';

Vue.use(VueI18n);
Vue.use(VueRouter);

// 工具方法
// AbCdEf => ab-cd-ef
const kebabCase = str => str.replace(/([A-Z])/g, s => '-' + s.toLowerCase()).replace(/^-/, '');

// 自动注册
Object.keys(lib).forEach(name => {
  Vue.component(`ex-${kebabCase(name)}`, lib[name]);
});

// 组装路由
const router = new VueRouter({
  mode: 'history',
  fallback: true,
  routes: [
    ...routes,
    { path: '*', component: lib.NoMatch },
  ],
});

// 首页处理 (TODO 也许有更好的办法)
router.beforeEach((to, from, next) => {
  const index = ['/', '/category', '/cart', '/usercenter'].indexOf(to.path);
  if (index !== -1) {
    store.commit({
      type: 'landing/home/setIndex',
      index: index,
    });

    store.dispatch('landing/home/setIndex', {
      index: index,
    });
  }
  next();
});

// 国际化
const i18n = new VueI18n({
  locale: 'en', // en|zh
  fallbackLocale: 'en',
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD',
      }
    },
    zh: {
      currency: {
        style: 'currency',
        currency: 'CNY',
      }
    },
  },
});

// 过滤器
Vue.filter('currency', function (num) {
  num = Number(num);
  if (isNaN(num)) {
    return 'NaN';
  }
  if (i18n.locale === 'zh') {
    return '￥' + num;
  }
  return '$' + num;
});

// LET'S GO
new Vue({ store, router, i18n }).$mount('#bootstrap');
