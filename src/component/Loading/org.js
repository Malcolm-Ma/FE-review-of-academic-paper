/**
 * @file org router
 * @author Mingze Ma
 */

import loadable from 'react-loadable';
import Loading from "src/component/Loading";

export default [
  {
    path: '/org/create',
    component: loadable({
      loader: () => import(/* webpackChunkName: 'org' */ /* webpackMode: 'lazy' */ 'src/module/org/create'),
      loading: Loading,
    }),
    exact: true,
  },
];
