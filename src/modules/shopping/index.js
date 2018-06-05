const Category = () => import(/* webpackChunkName: 'shopping' */ './category');

const routes = [
  { path: '/shopping/category/:id', component: Category },
];

export default routes;
