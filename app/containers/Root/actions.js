/*
 *
 * Root actions
 *
 */

import {
  GET_WEATHER_DATA,
  WEATHER_DATA_SUCCESS,
  WEATHER_DATA_FAIL,
} from './constants';

export const getWeatherData = params => ({
  type: GET_WEATHER_DATA,
  params,
});

export const weatherDataSucces = payload => ({
  type: WEATHER_DATA_SUCCESS,
  payload,
});

export const weatherDataFail = error => ({
  type: WEATHER_DATA_FAIL,
  error,
});
