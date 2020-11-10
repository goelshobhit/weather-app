import { createSelector } from 'reselect';

const selectRouter = state => state.router;
const selectSign = state => state.SignIn;
const rootDomain = state => state.root;

const makeSelectRoot = () =>
  createSelector(
    rootDomain,
    substate => substate,
  );
const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routeState => routeState.location,
  );
const makeSelectSignInToken = () =>
  createSelector(
    selectSign,
    substate => substate.token,
  );

export { makeSelectLocation, makeSelectSignInToken };
export default makeSelectRoot;
