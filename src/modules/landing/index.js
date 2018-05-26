const Home = () => import(/* webpackChunkName: 'landing' */ './home');
const Settings = () => import(/* webpackChunkName: 'landing' */ './settings');

const routes = [
  { path: '/', component: Home },
  { path: '/settings', component: Settings },
];

export default routes;
