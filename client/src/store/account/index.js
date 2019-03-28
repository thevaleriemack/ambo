import * as actions from './actions';

export function setAccountConnected(bool) {
  return dispatch => { dispatch(actions.setAccountConnected(bool)); }
}
