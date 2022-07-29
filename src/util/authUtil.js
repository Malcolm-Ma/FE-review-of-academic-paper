/**
 * @file authentication utils
 * @author Mingze Ma
 */

import _ from "lodash";

import { AUTH_TOKEN_KEY } from "src/constants/constants";

const getAuthToken = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return _.isEmpty(token) ? {} : { Authorization: token };
};

const setAuthToken = async (token) => {
  await localStorage.setItem(AUTH_TOKEN_KEY, token);
};

const removeAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export default {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
};
