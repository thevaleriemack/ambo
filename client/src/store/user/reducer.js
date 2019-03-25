import * as types from './types.js';

export const initialState = {
  locale: 'en',
  currency: 'USD'
};

export default function assetsReducer(state = initialState, action) {
  switch (action.type) {

    case types.SET_CURRENCY_SUCCESS:
      return { ...state, currency: action.payload };
    
    case types.SET_LOCALE_SUCCESS:
      return { ...state, locale: action.payload };
    
    default:
      return state;
  }
}
