/**
 * @file layout index
 * @author Mingze Ma
 */

import Header from "./Header";
import Main from "./Main";

import './index.less';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import actions from "src/actions";
import { message } from "antd";
import ignoredAuthCheckUrls from "src/configure/ignoredAuthCheckUrls";
import _ from "lodash";

export default () => {

  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(actions.getUserInfo()).unwrap()
      .catch(e => {
        if (!_.some(ignoredAuthCheckUrls, (item) => item === location.pathname)) {
          message.warn(e.message);
          navigate('/login');
        }
      })
  }, [dispatch, location.pathname, navigate]);

  return (
    <div className="apr-frame">
      <Header userInfo={userInfo} />
      <div className="frame-content">
        <Main />
      </div>
    </div>
  );
};
