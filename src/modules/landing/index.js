const Home = () => import(/* webpackChunkName: 'landing' */ './home');

const routes = [
  { path: '/(category|cart|usercenter)?', component: Home },
];

export default routes;
