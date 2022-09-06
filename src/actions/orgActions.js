/**
 * @file org actions
 * @author Mingze Ma
 */

import { createAsyncThunk } from '@reduxjs/toolkit'

import api from "src/api";
import apiConfig from "src/api/apiConfig";

export const getOrgListByUserId = params => api.get(apiConfig.org.orgListByUser, params);

export const createOrg = params => api.post(apiConfig.org.createOrg, params);

export const getOrgInfo = createAsyncThunk(
  'org/getOrgInfo',
  async (params) => api.get(apiConfig.org.orgInfo, params)
)

export const getSubmissionCount = params => api.get(apiConfig.org.submissionCount, params);

export const changeReviewProcess = params => api.post(apiConfig.org.changeProcess, params);

export const changeMemberType = params => api.post(apiConfig.org.changeMemberType, params);

export const addMembers = params => api.post(apiConfig.org.addMember, params);
