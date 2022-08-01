/**
 * @file user route config
 * @author Mingze Ma
 */

import loadable from '@loadable/component';
import Loading from "src/component/Loading";

export default [
  {
    path: '/login',
    component: loadable(
      () => import(/* webpackChunkName: 'user' */ /* webpackMode: 'lazy' */ 'src/module/user/login')
    ),
    exact: true,
  },
  {
    path: '/register',
    component: loadable(
      () => import(/* webpackChunkName: 'user' */ /* webpackMode: 'lazy' */ 'src/module/user/register')
    ),
    exact: true,
  },
];
