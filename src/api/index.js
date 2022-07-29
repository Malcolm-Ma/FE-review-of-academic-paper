/**
 * @file Api class
 * @author Mingze Ma
 */

import axios from "axios";
import _ from 'lodash';
import { message } from 'antd';

import { SERVICE_BASE_URL } from 'src/constants/constants';
import authUtil from "src/uril/authUtil";

export class Api {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: SERVICE_BASE_URL,
    });

    this.axiosInstance.interceptors.request.use((request) => {
      request.headers = { ...request.headers, ...authUtil.getAuthToken() };
      return request;
    })

    this.axiosInstance.interceptors.response.use((response) => {
      if (response.status === 200) {
        const { code, message: resMessage, data } = response.data;
        // Error in response
        if (code >= 400) {
          // message.error('Error! ' + resMessage);
          const error = new Error(resMessage);
          return Promise.reject(error);
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
