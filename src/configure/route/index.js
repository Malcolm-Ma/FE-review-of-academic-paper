/**
 * @file route config
 * @author Mingze Ma
 */

import loadable from 'react-loadable';
import { Spin } from "antd";

const Loading = () => <Spin size="large"/>

export default [
  {
    path: '/',
    component: loadable({
      loader: () => import(/* webpackChunkName: 'home' */ /* webpackMode: 'lazy' */ 'src/module/home'),
      loading: Loading,
    }),
    exact: true,
  },
  {
    path: '/login',
    component: loadable({
      loader: () => import(/* webpackChunkName: 'user' */ /* webpackMode: 'lazy' */ 'src/module/login'),
      loading: Loading,
    }),
    exact: true,
  },
  {
    path: '/register',
    component: loadable({
      loader: () => import(/* webpackChunkName: 'user' */ /* webpackMode: 'lazy' */ 'src/module/register'),
      loading: Loading,
    }),
    exact: true,
  },
];
