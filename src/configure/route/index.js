/**
 * @file route config
 * @author Mingze Ma
 */

import loadable from '@loadable/component';
import Loading from "src/component/Loading";

import user from "src/configure/route/user";
import org from "src/configure/route/org";
import review from "src/configure/route/review";

export default [
  {
    path: '/',
    component: loadable(
      () => import(/* webpackChunkName: 'home' */ /* webpackMode: 'lazy' */ 'src/module/home'),
    ),
    exact: true,
  },
  ...user,
  ...org,
  ...review,
];
