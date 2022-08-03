/**
 * @file review actions
 * @author Mingze Ma
 */

import { createAsyncThunk } from '@reduxjs/toolkit'

import api from "src/api";
import apiConfig from "src/api/apiConfig";

export const getSubmissionList = params => api.post(apiConfig.review.submissionList, params);

export const createReview = params => api.post(apiConfig.review.createReview, params);
