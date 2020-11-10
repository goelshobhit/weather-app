import { SIGN_IN_SUCCESS, SIGN_OUT, MEMBER_SIGN_OUT } from './constants';

export function signInSuccess(token) {
  return {
    type: SIGN_IN_SUCCESS,
    token,
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

export function memberSignOut() {
  return {
    type: MEMBER_SIGN_OUT,
  };
}
