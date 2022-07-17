/**
 * @file Api class
 * @author Mingze Ma
 */

import axios from "axios";
import _ from 'lodash';
import { message } from 'antd';

import { SERVICE_BASE_URL } from 'src/constants/constants';

export class Api {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: SERVICE_BASE_URL,
    });

    // Allow cookie
    this.axiosInstance.defaults.withCredentials = true;

    this.axiosInstance.interceptors.response.use((response) => {
      if (response.status === 200) {
        const { code, message, data } = response.data;
        // Error in response
        if (code >= 400) {
          message.error('Error! ' + message);
          return Promise.reject(new Error(message));
        }
        // return success data
        return data;
      } else {
        message.error('Fall to request：' + response.status);
      }
    }, (error) => {
      message.error(error.message + ', please try again');
      return Promise.reject(error);
    });
  }

  get(url, data, options) {
    return this.axiosInstance(url, {
      method: 'get',
      params: data,
      ...options,
    });
  }

  post(url, data, options) {
    return this.axiosInstance(url, {
      method: 'post',
      data,
      ...options,
    });
  }
}

export default new Api();
