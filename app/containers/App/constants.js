/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SIGN_IN_SUCCESS = 'app/containers/App/SIGN_IN_SUCCESS';
export const SIGN_OUT = 'app/containers/App/SIGN_OUT';
export const MEMBER_SIGN_OUT = 'app/containers/MEMBER_SIGN_OUT';
export const DEFAULT_ACTION = 'app/containers/App/DEFAULT_ACTION';
