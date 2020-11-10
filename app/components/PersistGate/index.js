/**
 *
 * PremiumContent
 *
 */

import React from 'react';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import makeSelectRoot from '../../containers/App/selectors';

class PersistGate extends React.PureComponent {
  render() {
    const element = _.get(this.props.root, 'persisted', '')
      ? this.props.children
      : null;

    return element;
  }
}

PersistGate.propTypes = {
  ...PersistGate,
  root: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  root: makeSelectRoot(),
});

export default connect(
  mapStateToProps,
  null,
)(PersistGate);
