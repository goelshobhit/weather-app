import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { change } from 'redux-form';
import { SIGN_IN } from './constants';
import { signInError } from './actions';
import { signInSuccess } from '../App/actions';

function* signIn() {
  try {
    console.log('api called');
  } catch (e) {
    yield put(signInError(e));
  }
}

export default function* signInSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SIGN_IN, signIn);
}
