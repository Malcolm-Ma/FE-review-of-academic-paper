/**
 * @file user actions
 * @author Mingze Ma
 */

import { createAsyncThunk } from '@reduxjs/toolkit'

import api from "src/api";
import apiConfig from "src/api/apiConfig";
import authUtil from "src/uril/authUtil";

export const register = params => api.post(apiConfig.user.register, params);

export const login = async (params) => {
  try {
    const { token, tokenHead: token_head } = await api.post(apiConfig.user.login, params);
    const fullToken = token_head + token;
    await authUtil.setAuthToken(fullToken);
  } catch (e) {
    console.error('login error');
  }
}

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
  const resp = await api.get(apiConfig.user.info);
  return resp;
})
