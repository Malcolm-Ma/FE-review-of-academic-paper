/**
 * @file user route config
 * @author Mingze Ma
 */

import loadable from 'react-loadable';
import Loading from "src/component/Loading";

export default [
  {
    path: '/login',
    component: loadable({
      loader: () => import(/* webpackChunkName: 'user' */ /* webpackMode: 'lazy' */ 'src/module/user/login'),
      loading: Loading,
    }),
    exact: true,
  },
  {
    path: '/register',
    component: loadable({
      loader: () => import(/* webpackChunkName: 'user' */ /* webpackMode: 'lazy' */ 'src/module/user/register'),
      loading: Loading,
    }),
    exact: true,
  },
];
