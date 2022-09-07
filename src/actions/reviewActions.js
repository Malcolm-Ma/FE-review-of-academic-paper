/**
 * @file review actions
 * @author Mingze Ma
 */

import { createAsyncThunk } from '@reduxjs/toolkit'

import api from "src/api";
import apiConfig from "src/api/apiConfig";

export const getSubmissionList = params => api.post(apiConfig.review.submissionList, params);

export const createSubmission = params => api.post(apiConfig.review.createSubmission, params);

export const setBiddingPref = params => api.post(apiConfig.review.biddingPref, params);

export const getBiddingPrefSummary = params => api.get(apiConfig.review.biddingPrefSummary, params);

export const getReviewTask = params => api.post(apiConfig.review.getReviewTask, params);

export const createNewReview = params => api.post(apiConfig.review.createNewReview, params);

export const getReviewSummary = params => api.post(apiConfig.review.reviewSummary, params);

export const getConflictInterestUsers = params => api.get(apiConfig.review.conflictInterest, params);

export const allocateBidding = params => api.post(apiConfig.review.allocateBidding, params);

export const getBiddingResult = params => api.get(apiConfig.review.biddingResult, params);

export const setBlindMode = params => api.post(apiConfig.review.blindMode, params);

export const generateReviewingResult = params => api.post(apiConfig.review.generateReviewingResult, params);

export const reviseReview = params => api.post(apiConfig.review.reviseReview, params);
