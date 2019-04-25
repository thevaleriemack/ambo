import * as types from './types';

const initialState = {
  connected: false
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {

    case types.SET_CONNECTED_SUCCESS:
      return { ...state, connected: action.payload }
    
    default:
      return state;
  }
}
