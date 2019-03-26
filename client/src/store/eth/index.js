import * as actions from './actions';

const NETWORKS = {
  1: "Main",
  4: "Rinkeby"
}

export function updateEnabledStatus(bool) {
  return dispatch => { dispatch(actions.updateEnabledStatus(bool)); }
}

export function updateNamespaceStatus(bool) {
  return dispatch => { dispatch(actions.updateNamespaceStatus(bool)); }
}

export function setEthNetwork(networkId) {
  return dispatch => {
    if ((networkId in NETWORKS) === false) {
      dispatch(actions.setEthNetworkFailure());
    } else {
      dispatch(actions.setEthNetwork(networkId, NETWORKS[networkId]));
    }
  }
}
