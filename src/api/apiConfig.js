/**
 * @file api url config
 * @author Mingze Ma
 */

export default {
  user: {
    login: '/user/login',
    register: '/user/register',
    info: '/user/info/get',
    logout: 'user/logout',
    searchUser: '/user/search',
  },
  file: {
    upload: '/upload',
  },
  org: {
    orgListByUser: '/org/list/get',
    createOrg: '/org/create',
    orgInfo: 'org/detail/get',
    submissionCount: '/org/submission_count/get',
    changeProcess: '/org/process/change',
  },
  review: {
    createSubmission: '/review/submission/create',
    submissionList: '/review/submission_list/get',
    biddingPref: '/review/bidding/pref/set',
    allocateBidding: '/review/bidding/allocate',
    biddingPrefSummary: '/review/bidding/pref/summary',
    getReviewTask: '/review/task/get',
    createNewReview: 'review/create',
    reviewSummary: '/review/summary/get',
    conflictInterest: '/review/conflict_interest/get',
    biddingResult: '/review/allocation_result/get',
    blindMode: '/org/double_blind/set',
  },
};
