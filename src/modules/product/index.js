const Category = () => import(/* webpackChunkName: 'product' */ './category');

const routes = [
  { path: '/product/category/:id', component: Category },
];

export default routes;
