import { SET_CONNECTED_SUCCESS } from './index';

const initialState = {
  connected: false
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {

    case SET_CONNECTED_SUCCESS:
      return { ...state, connected: action.payload }
    
    default:
      return state;
  }
}