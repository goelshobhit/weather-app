import { call, takeLatest, put } from 'redux-saga/effects';
import request from 'utils/request';
import { GET_WEATHER_DATA } from './constants';
import { weatherDataSucces, weatherDataFail } from './actions';

function* getData({ params }) {
  try {
    const options = {
      method: 'get',
      url: `https://api.openweathermap.org/data/2.5/forecast?lat=${
        params.lat
      }&lon=${params.lng}&cnt=5&APPID=2fc0d182e0ab28bd228d0f07bff89a86`,
    };
    const response = yield call(request, options);
    yield put(weatherDataSucces(response));
  } catch (e) {
    yield put(weatherDataFail(e));
  }
}
export default function* rootSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_WEATHER_DATA, getData);
}
