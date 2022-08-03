/**
 * @file review router
 * @author Mingze Ma
 */

import loadable from '@loadable/component';
import Loading from "src/component/Loading";

export default [
  {
    path: '/org/:orgId/review/create',
    component: loadable(
      () => import(/* webpackChunkName: 'review' */ /* webpackMode: 'lazy' */ 'src/module/review/create')
    ),
    exact: true,
  },
  {
    path: '/review/create',
    component: loadable(
      () => import(/* webpackChunkName: 'review' */ /* webpackMode: 'lazy' */ 'src/module/review/create')
    ),
    exact: true,
  },
];
