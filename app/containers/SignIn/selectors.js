import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the signIn state domain
 */

const selectSignInDomain = state => state.signIn || initialState;
/**
 * Other specific selectors
 */

/**
 * Default selector used by SignIn
 */

const makeSelectSignIn = () =>
  createSelector(
    selectSignInDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectSignInDomain,
    substate => substate.loading,
  );

export default makeSelectSignIn;
export { selectSignInDomain, makeSelectSignIn, makeSelectLoading };
