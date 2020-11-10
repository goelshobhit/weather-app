/**
 *
 * SignIn
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import FacebookLogin from 'react-facebook-login';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { signInSuccess } from '../App/actions';

import { makeSelectSignIn, makeSelectLoading } from './selectors';

import reducer from './reducer';
import saga from './saga';

export function SignIn({ fbLogin }) {
  useInjectReducer({ key: 'signIn', reducer });
  useInjectSaga({ key: 'signIn', saga });

  const facebookResponse = data => {
    fbLogin(data);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
      <Paper>
        <FacebookLogin
          appId="363354498069351"
          autoLoad={false}
          fields="name,email,picture"
          callback={facebookResponse}
        />
      </Paper>
    </div>
  );
}

SignIn.propTypes = {
  ...SignIn,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  signIn: makeSelectSignIn(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fbLogin: data => {
      dispatch(signInSuccess(data));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SignIn);
