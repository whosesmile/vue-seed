const Home = () => import(/* webpackChunkName: 'account' */ './home');
const Orders = () => import(/* webpackChunkName: 'account' */ './orders');

const routes = [
  { path: '/account', component: Home },
  { path: '/account/orders', component: Orders }
];

export default routes;
