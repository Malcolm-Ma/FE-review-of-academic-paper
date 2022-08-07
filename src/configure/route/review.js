/**
 * @file review router
 * @author Mingze Ma
 */

import loadable from '@loadable/component';
import Loading from "src/component/Loading";

export default [
  {
    path: '/org/:orgId/submissions',
    component: loadable(
      () => import(/* webpackChunkName: 'org' */ /* webpackMode: 'lazy' */ 'src/module/submission')
    ),
    exact: true,
  },
  {
    path: '/org/:orgId/submission/create',
    component: loadable(
      () => import(/* webpackChunkName: 'review' */ /* webpackMode: 'lazy' */ 'src/module/submission/create')
    ),
    exact: true,
  },
  {
    path: '/submission/create',
    component: loadable(
      () => import(/* webpackChunkName: 'review' */ /* webpackMode: 'lazy' */ 'src/module/submission/create')
    ),
    exact: true,
  },
];
