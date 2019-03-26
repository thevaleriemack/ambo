import * as types from './types';

const initialState = {
  address: "",
  locale: 'en',
  currency: 'USD'
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {

    case types.SET_ADDRESS_SUCCESS:
      return { ...state, address: action.payload }
    case types.SET_ADDRESS_FAILURE:
      return state;

    case types.SET_CURRENCY_SUCCESS:
      return { ...state, currency: action.payload };
    
    case types.SET_LOCALE_SUCCESS:
      return { ...state, locale: action.payload };
    
    default:
      return state;
  }
}
