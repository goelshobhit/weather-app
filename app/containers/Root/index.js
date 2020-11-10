/**
 *
 * Root
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _, { isEmpty, map, get } from 'lodash';
import { createStructuredSelector } from 'reselect';
import localforage from 'localforage';
import { compose } from 'redux';
import Card from 'components/Card';
import Button from '@material-ui/core/Button';
import { memberSignOut } from 'containers/App/actions';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectRoot } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getWeatherData } from './actions';

export function Root({
  OnRequestWeatherData,
  root: { loading, data },
  logout,
}) {
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
    OnRequestWeatherData(JSON.parse(serializedState));
  }

  function error(error) {
    console.log(error);
  }

  return (
    <div className="container d-flex flex-column">
      <div className="d-flex flex-row align-items-end justify-content-end w-100 h-100 pt-10">
        <Button
          variant="outlined"
          color="primary"
          style={{ marginTop: 10 }}
          onClick={() => logout()}
        >
          Logout
        </Button>
      </div>
      <div className="d-flex flex-wrap flex-row align-items-center justify-content-center w-100 h-100">
        {map(get(data, 'list', []), item => (
          <Card item={item} key={item.dt} />
        ))}
      </div>
    </div>
  );
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
    logout: () => dispatch(memberSignOut()),
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
