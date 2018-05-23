const Home = () => import(/* webpackChunkName: 'account' */ './home.vue');
const Orders = () => import(/* webpackChunkName: 'account' */ './orders.vue');

const routes = [
  { path: '/account', component: Home },
  { path: '/account/orders', component: Orders }
];

export default routes;
