/**
 * @file user actions
 * @author Mingze Ma
 */

import { createAsyncThunk } from '@reduxjs/toolkit'

import api from "src/api";
import apiConfig from "src/api/apiConfig";
import authUtil from "src/util/authUtil";
import { message } from "antd";

export const register = params => api.post(apiConfig.user.register, params);

export const login = async (params) => {
  try {
    const { token, token_head: tokenHead } = await api.post(apiConfig.user.login, params);
    const fullToken = tokenHead + token;
    await authUtil.setAuthToken(fullToken);
  } catch (e) {
    console.error('login error');
    throw e;
  }
};

export const logout = createAsyncThunk('user/logout', async (params) => {
  return api.get(apiConfig.user.logout);
});

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
  return api.get(apiConfig.user.info);
});

export const searchUsers = params => api.post(apiConfig.user.searchUser, params);
