/**
 *
 * Root
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _, { isEmpty } from 'lodash';
import { createStructuredSelector } from 'reselect';
import localforage from 'localforage';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectRoot } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getWeatherData } from './actions';

export function Root({ OnRequestWeatherData }) {
  useInjectReducer({ key: 'root', reducer });
  useInjectSaga({ key: 'root', saga });
  const [location, setLocation] = useState({});

  useEffect(() => {
    async function fetchMyAPILocation() {
      const response = await localforage.getItem('location', (err, state) => {
        if (err) return false;
        return JSON.parse(state);
      });
      setLocation(response);
    }

    fetchMyAPILocation();
  }, []);

  useEffect(() => {
    if (isEmpty(location)) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      OnRequestWeatherData(JSON.parse(location));
    }
  }, [location]);

  function success(location) {
    const {
      coords: { latitude, longitude },
    } = location;
    const locationData = {
      lat: latitude,
      lng: longitude,
    };
    const serializedState = JSON.stringify(locationData);
    localforage.setItem('location', serializedState);
  }

  function error(error) {
    console.log(error);
  }

  console.log(location);
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
    OnRequestWeatherData: params => dispatch(getWeatherData(params)),
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
