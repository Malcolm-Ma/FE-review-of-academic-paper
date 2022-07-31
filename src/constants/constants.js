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
