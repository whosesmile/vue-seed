const Home = () => import(/* webpackChunkName: 'landing' */ './home.vue');
const Settings = () => import(/* webpackChunkName: 'landing' */ './settings.vue');

const routes = [
  { path: '/', component: Home },
  { path: '/settings', component: Settings }
];

export default routes;
