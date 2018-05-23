import Home from './home';
import Orders from './orders';

const routes = [
  { path: '/account', component: Home },
  { path: '/account/orders', component: Orders }
];

export default routes;
