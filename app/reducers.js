/* eslint-disable no-param-reassign */
/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { fromJS } from 'immutable';
import { connectRouter } from 'connected-react-router';
import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import { LOCATION_CHANGE } from 'react-router-redux';
import _ from 'lodash';

import signInReducer from './containers/SignIn/reducer';
import rootR from './containers/App/reducer';
import { MEMBER_SIGN_OUT } from './containers/App/constants';
import { REHYDRATE, removeState } from './storage';

let initialState = {};
/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  location: null,
});

/**
 * Merge route into the global application state
 */
export function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });

    default:
      return state;
  }
}

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const appReducers = combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),
    SignIn: signInReducer,
    root: rootR,
    ...injectedReducers,
  });

  const rootReducer = (state, action) => {
    if (action.type === MEMBER_SIGN_OUT) {
      removeState();
      state = initialState;
      return state;
    }

    if (action.type === REHYDRATE) {
      const newState = _.defaultsDeep(
        action.persistedState || {},
        action.inboundState,
      );

      initialState = action.inboundState;

      initialState.root.persisted = true;

      newState.root.persisted = true;
      state = newState;

      newState.root.persisted = true;
      state = newState;
      return state;
    }
    return appReducers(state, action);
  };

  return rootReducer;
}
