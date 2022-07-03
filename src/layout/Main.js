/**
 * @file Main page
 * @author Mingze Ma
 */

import _ from 'lodash';
import { Layout } from 'antd';
import {
  Switch,
  Route
} from "react-router-dom";

import route from "../configure/route";

export default () => {

  return (
    <Switch>
      {
        _.map(route, (item) => {
          return (
            <Route
              key={item.path}
              path={item.path}
              {...item}
            />
          );
        })
      }
    </Switch>
  );
};
