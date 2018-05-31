const Home = () => import(/* webpackChunkName: 'example' */ './home');
const Loader = () => import(/* webpackChunkName: 'example' */ './loader');

const routes = [
  { path: '/example', component: Home },
  { path: '/example/loader', component: Loader },
];

export default routes;
