/**
 * @file org router
 * @author Mingze Ma
 */

import loadable from '@loadable/component';
import Loading from "src/component/Loading";

export default [
  {
    path: '/org/create',
    component: loadable(
      () => import(/* webpackChunkName: 'org' */ /* webpackMode: 'lazy' */ 'src/module/org/create')
    ),
    exact: true,
  },
  {
    path: '/org/:orgId/dashboard',
    component: loadable(
      () => import(/* webpackChunkName: 'org' */ /* webpackMode: 'lazy' */ 'src/module/org/dashboard')
    ),
    exact: true,
  },
  {
    path: '/org/:orgId',
    component: loadable(
      () => import(/* webpackChunkName: 'org' */ /* webpackMode: 'lazy' */ 'src/module/org/dashboard')
    ),
    exact: true,
  },
  {
    path: '/org/:orgId/user',
    component: loadable(
      () => import(/* webpackChunkName: 'org' */ /* webpackMode: 'lazy' */ 'src/module/org/user')
    ),
    exact: true,
  },
  {
    path: '/org/:orgId/user/create',
    component: loadable(
      () => import(/* webpackChunkName: 'org' */ /* webpackMode: 'lazy' */ 'src/module/org/user')
    ),
    exact: true,
  },
];
