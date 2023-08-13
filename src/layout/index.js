/**
 * @file layout index
 * @author Mingze Ma
 */

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import _ from "lodash";
import { message } from "antd";
import Box from "@mui/material/Box";

import actions from "src/actions";
import ignoredAuthCheckUrls from "src/configure/ignoredAuthCheckUrls";
import authUtil from "src/util/authUtil";
import MyThemeProvider from "src/configure/theme";
import { APPBAR_DESKTOP, APPBAR_MOBILE } from "src/constants/constants";

import Header from "./Header";
import Main from "./Main";

import './index.less';

message.config({
  top: 88,
});

export default () => {

  const dispatch = useDispatch();
  const { userInfo, init } = useSelector(state => state.user);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!init) {
      dispatch(actions.getUserInfo()).unwrap()
        .catch(e => {
          authUtil.removeAuthToken();
          if (!_.some(ignoredAuthCheckUrls, (item) => item === location.pathname)) {
            message.warn('Account has timed out, please log in again');
            navigate('/login');
          }
        })
    }
  }, [dispatch, location.pathname, navigate]);

  return (
    <MyThemeProvider>
      <div className="apr-frame">
        <Header userInfo={userInfo} init={init}/>
        <Box sx={(theme) => ({
          flexGrow: 1,
          overflow: 'auto',
          minHeight: '100%',
          paddingTop: APPBAR_MOBILE + 24 + 'px',
          bgcolor: 'background.default',
          // paddingBottom: theme.spacing(10),
          [theme.breakpoints.up('lg')]: {
            paddingTop: APPBAR_DESKTOP + 24 + 'px',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
          }
        })}>
          <Main/>
        </Box>
      </div>
    </MyThemeProvider>
  );
};
