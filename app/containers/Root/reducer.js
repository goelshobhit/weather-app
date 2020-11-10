/*
 *
 * Root reducer
 *
 */
import produce from 'immer';
import {
  GET_WEATHER_DATA,
  WEATHER_DATA_FAIL,
  WEATHER_DATA_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  data: {},
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const rootReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_WEATHER_DATA:
        draft.loading = true;
        break;
      case WEATHER_DATA_SUCCESS:
        draft.loading = false;
        draft.data = action.payload;
        break;
      case WEATHER_DATA_FAIL:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default rootReducer;
