/**
 * @file constants value
 * @author Mingze Ma
 */

export const SERVICE_BASE_URL = 'http://localhost:8080';

export const AUTH_TOKEN_KEY = 'JWT_AUTH_TOKEN';

export const USER_TYPE = {
  1: 'Member',
  2: 'Manager',
  3: 'Owner',
  0: 'Disabled',
};

export const EMAIL_PATTERN = /^\S+@\S+$/i;

export const APPBAR_MOBILE = 64;

export const APPBAR_DESKTOP = 72;

export const DATE_FORMAT = 'MMM Do YY';

export const DATETIME_FORMAT = 'DD/MM/YYYY hh:mm:ss';

export const REVIEW_PROCESS = {
  0: 'Preparing',
  1: 'Collecting',
  2: 'Bidding',
  3: 'Reviewing',
  4: 'Finished',
};

export const EVALUATION_TYPE = {
  0: 'Comment',
  1: 'Review',
};
