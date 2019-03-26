import * as types from './types.js';

const initialState = {
  namespaced: false,
  enabled: false,
  networkId: "",
  networkName: ""
}

export default function ethereumReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_NAMESPACE_STATUS:
      return { ...state, namespaced: action.payload }

    case types.UPDATE_ENABLED_STATUS:
      return { ...state, enabled: action.payload }
    
    case types.SET_NETWORK_SUCCESS:
      return {
        ...state,
        networkId: action.payload.id,
        networkName: action.payload.name
      };
    case types.SET_NETWORK_FAILURE:
      return {
        ...state,
        networkId: "",
        networkName: ""
      };
    
    default:
      return state;
  }
}
