import localforage from 'localforage';

localforage.setDriver(localforage.LOCALSTORAGE);

export const REHYDRATE = 'storage/rehydrate';

export const rehydrateAction = (inboundState, persistedState) => ({
  type: REHYDRATE,
  inboundState,
  persistedState,
});

/* Project specific storage api */
/* eslint consistent-return: 0 */
export const loadState = cb => {
  try {
    localforage.getItem('state', (err, state) => {
      if (err) return cb(err);
      return cb(null, JSON.parse(state));
    });
  } catch (err) {
    return cb(null, {});
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localforage.setItem('state', serializedState);
  } catch (err) {
    // err while saving state
  }
};

export const removeState = () => {
  try {
    localforage.clear();
    localStorage.setItem('logout-event', `logout${Math.random()}`);
  } catch (err) {
    // err while saving state
  }
};
