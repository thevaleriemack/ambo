import * as types from './types.js';

export const initialState = {
  all: [],
  images: []
};

export default function assetsReducer(state = initialState, action) {
  switch (action.type) {

    case types.SET_ALL_ASSETS_SUCCESS:
      return { ...state, all: action.payload };
    case types.SET_ALL_ASSETS_FAILURE:
      return state;
    
    case types.SET_ASSET_IMAGES_SUCCESS:
      return {...state, images: action.payload }
    case types.SET_ASSET_IMAGES_FAILURE:
      return state;
    
    default:
      return state;
  }
}
