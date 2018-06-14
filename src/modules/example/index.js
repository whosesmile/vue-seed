const Home = () => import(/* webpackChunkName: 'example' */ './home');
const Loader = () => import(/* webpackChunkName: 'example' */ './loader');
const Image = () => import(/* webpackChunkName: 'example' */ './image');
const TabView = () => import(/* webpackChunkName: 'example' */ './tabview');

const routes = [
  { path: '/example', component: Home },
  { path: '/example/loader', component: Loader },
  { path: '/example/image', component: Image },
  { path: '/example/tabview', component: TabView },
];

export default routes;
