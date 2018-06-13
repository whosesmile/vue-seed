const Category = () => import(/* webpackChunkName: 'product' */ './category');
const Details = () => import(/* webpackChunkName: 'product' */ './details');

const routes = [
  { path: '/product/category', component: Category },
  { path: '/product/details/:id', component: Details },
];

export default routes;
