/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import history from 'utils/history';
import SignInContainer from '../SignIn/index';
import RootContainer from '../Root/index';
import NavBar from '../../components/NavBar';
import {
  userIsAuthenticatedRedir,
  userIsNotAuthenticatedRedir,
} from '../../auth';

import GlobalStyle from '../../global-styles';

const SignIn = userIsNotAuthenticatedRedir(SignInContainer);
const Root = userIsAuthenticatedRedir(RootContainer);

history.listen(() => {
  window.scrollTo(0, 0);
});

export default function App() {
  return (
    <div style={{ height: '100vh' }}>
      <NavBar />
      <Switch>
        <Route key={1} exact path="/login" component={SignIn} />
        <Route key={2} path="/" component={Root} history={history} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
