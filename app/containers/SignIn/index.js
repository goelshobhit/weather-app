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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectSignIn, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { signIn } from './actions';

export function SignIn() {
  useInjectReducer({ key: 'signIn', reducer });
  useInjectSaga({ key: 'signIn', saga });

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
      <Paper>This is signIn form</Paper>
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
    signInForm: () => {
      dispatch(signIn());
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
