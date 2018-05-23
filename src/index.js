import './less/index.less';
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './schema';
import NoMatch from './components/nomatch';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    ...routes,
    { path: '*', component: NoMatch },
  ],
});
new Vue({ router }).$mount('#bootstrap');
