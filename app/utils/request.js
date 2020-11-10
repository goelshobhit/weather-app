/* eslint-disable no-param-reassign */
import axios from 'axios';
import _ from 'lodash';
import { configuredStore } from '../configureStore';

export const axiosInstance = axios.create({
  baseURL: config.baseURL, //eslint-disable-line
  responseType: 'json',
});

axiosInstance.interceptors.request.use(
  config => {
    const { token } = configuredStore.getState().SignIn;
    config.headers.deviceType = 'web';
    return config;
  },
  err => Promise.reject(err),
);

axiosInstance.interceptors.response.use(
  response => {
    if (response.data) return response.data;
    return response;
  },
  err => Promise.reject(err),
);

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(options) {
  return axiosInstance(options);
}
