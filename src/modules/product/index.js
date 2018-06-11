const Category = () => import(/* webpackChunkName: 'product' */ './category');

const routes = [
  { path: '/product/category', component: Category },
];

export default routes;
