/*
 *
 * SignIn actions
 *
 */

import { DEFAULT_ACTION, SIGN_IN, SIGN_IN_ERROR } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function signIn(values) {
  return {
    type: SIGN_IN,
    values,
  };
}

export function signInError() {
  return {
    type: SIGN_IN_ERROR,
  };
}
