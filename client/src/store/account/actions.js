import * as types from './types';

export function setAccountConnected(bool) {
  return { type: types.SET_CONNECTED_SUCCESS, payload: bool }
}
