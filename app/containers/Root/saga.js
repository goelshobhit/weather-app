import { call, takeLatest, put } from 'redux-saga/effects';
import request from 'utils/request';
import { GET_WEATHER_DATA } from './constants';
import { weatherDataSucces, weatherDataFail } from './actions';

// Individual exports for testing

// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}

function* getData({ params }) {
  console.log(params);
  console.log(params.lat);
  console.log(params.lng);
  try {
    const options = {
      method: 'get',
    };
    const url = `forecast/daily?lat=${params.lat}&lon=${
      params.lng
    }&cnt=5&appid=2fc0d182e0ab28bd228d0f07bff89a86`;
    const response = request(url, options);
    console.log(response);
  } catch (e) {
    console.log(e);
    yield put(weatherDataFail(e));
  }
}
export default function* rootSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_WEATHER_DATA, getData);
}
