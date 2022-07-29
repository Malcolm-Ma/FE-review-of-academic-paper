/**
 * @file route config
 * @author Mingze Ma
 */

import loadable from 'react-loadable';
import Loading from "src/component/Loading";

import user from "src/configure/route/user";
import org from "src/component/Loading/org";

export default [
  {
    path: '/',
    component: loadable({
      loader: () => import(/* webpackChunkName: 'home' */ /* webpackMode: 'lazy' */ 'src/module/home'),
      loading: Loading,
    }),
    exact: true,
  },
  ...user,
  ...org,
];
