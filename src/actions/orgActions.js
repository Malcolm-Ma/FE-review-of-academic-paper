/**
 * @file org actions
 * @author Mingze Ma
 */

import { createAsyncThunk } from '@reduxjs/toolkit'

import api from "src/api";
import apiConfig from "src/api/apiConfig";

export const getOrgListByUserId = params => api.get(apiConfig.org.orgListByUser, params);

export const createOrg = params => api.post(apiConfig.org.createOrg, params);
