/*
 *
 * SignIn reducer
 *
 */
import produce from 'immer';

import { DEFAULT_ACTION, SIGN_IN, SIGN_IN_ERROR } from './constants';
import { SIGN_IN_SUCCESS } from '../App/constants';

export const initialState = {
  token: {},
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const signInReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SIGN_IN:
        draft.loading = true;
        break;
      case SIGN_IN_ERROR:
        draft.loading = false;
        break;
      case SIGN_IN_SUCCESS:
        draft.loading = false;
        draft.token = action.token;
        break;
    }
  });

export default signInReducer;
