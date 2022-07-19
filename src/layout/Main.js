/**
 * @file Main page
 * @author Mingze Ma
 */

import _ from 'lodash';
import {
  Routes,
  Route,
} from "react-router-dom";

import route from "../configure/route";

export default () => {

  return (
    <Routes>
      {
        _.map(route, (item) => {
          const {path, component: Component, ...otherProps} = item;
          return (
            <Route
              key={path}
              path={path}
              element={<Component/>}
              {...otherProps}
            />
          );
        })
      }
    </Routes>
  );
};
