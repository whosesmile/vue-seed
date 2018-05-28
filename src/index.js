import './less/index.less';
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './ducks';
import { routes } from './schema';
import NoMatch from './components/nomatch';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  fallback: true,
  routes: [
    ...routes,
    { path: '*', component: NoMatch },
  ],
});

new Vue({ store, router }).$mount('#bootstrap');
