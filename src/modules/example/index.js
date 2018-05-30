const Home = () => import(/* webpackChunkName: 'example' */ './home');

const routes = [
  { path: '/example', component: Home },
];

export default routes;
