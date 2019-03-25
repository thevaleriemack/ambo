import * as types from './types.js';

export const initialState = {
  all: [],
  prices: []
};

export default function assetsReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_ALL_ASSETS_SUCCESS:
      return { ...state, all: action.payload };
    case types.SET_ALL_ASSETS_FAILURE:
      return state;
    default:
      return state;
  }
}
