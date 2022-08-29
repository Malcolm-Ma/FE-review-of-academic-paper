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
      () => import(/* webpackChunkName: 'review' */ /* webpackMode: 'lazy' */ 'src/module/submission')
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
  {
    path: '/org/:orgId/bidding',
    component: loadable(
      () => import(/* webpackChunkName: 'review' */ /* webpackMode: 'lazy' */ 'src/module/bidding')
    ),
    exact: true,
  },
  {
    path: '/org/:orgId/review_task',
    component: loadable(
      () => import(/* webpackChunkName: 'review' */ /* webpackMode: 'lazy' */ 'src/module/review')
    ),
    exact: true,
  },
  {
    path: '/org/:orgId/review_task/:reviewId/new',
    component: loadable(
      () => import(/* webpackChunkName: 'review' */ /* webpackMode: 'lazy' */ 'src/module/review/create')
    ),
    exact: true,
  },
];
