const Home = () => import(/* webpackChunkName: 'example' */ './home');
const Loader = () => import(/* webpackChunkName: 'example' */ './loader');
const Image = () => import(/* webpackChunkName: 'example' */ './image');

const routes = [
  { path: '/example', component: Home },
  { path: '/example/loader', component: Loader },
  { path: '/example/image', component: Image },
];

export default routes;
