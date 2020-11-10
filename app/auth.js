import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
const locationHelper = locationHelperBuilder({});

const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => state.SignIn.token.id !== undefined,
  wrapperDisplayName: 'UserIsAuthenticated',
};

export const userIsAuthenticated = connectedAuthWrapper(
  userIsAuthenticatedDefaults,
);

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  redirectPath: '/login',
  allowRedirectBack: true,
});

const userIsNotAuthenticatedDefaults = {
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: state => {
    const { token } = state.SignIn;

    return token.id === undefined;
  },
  wrapperDisplayName: 'UserIsNotAuthenticated',
};

export const userIsNotAuthenticated = connectedAuthWrapper(
  userIsNotAuthenticatedDefaults,
);

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/Dashboard',
  allowRedirectBack: false,
});
