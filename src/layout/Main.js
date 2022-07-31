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
import Container from "@mui/material/Container";

export default () => {

  return (
    <Container maxWidth="xl" disableGutters={true}>
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
    </Container>
  );
};
