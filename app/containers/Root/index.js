/**
 *
 * Root
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import _ from 'lodash';

import { makeSelectRoot } from './selectors';
import reducer from './reducer';
import saga from './saga';

export function Root({}) {
  useInjectReducer({ key: 'root', reducer });
  useInjectSaga({ key: 'root', saga });

  return <div>This is a dashboard</div>;
}

Root.propTypes = {
  ...Root,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  root: makeSelectRoot(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Root);
