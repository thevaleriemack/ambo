import * as types from './types.js';

export function setAll(assets) {
  return { type: types.SET_ALL_SUCCESS, payload: assets }
}

export function setAllFailure() {
  return { type: types.SET_ALL_FAILURE }
}