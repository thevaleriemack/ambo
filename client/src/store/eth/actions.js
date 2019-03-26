import * as types from './types';

export function updateNamespaceStatus(namespaced) {
  return { type: types.UPDATE_NAMESPACE_STATUS, payload: namespaced }
}

export function updateEnabledStatus(enabled) {
  return { type: types.UPDATE_ENABLED_STATUS, payload: enabled }
}

export function setEthNetwork(id, name) {
  return {
    type: types.SET_NETWORK_SUCCESS,
    payload: { id, name }
  }
}

export function setEthNetworkFailure() {
  return { type: types.SET_NETWORK_FAILURE }
}
