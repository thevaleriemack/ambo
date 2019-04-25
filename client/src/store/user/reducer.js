import * as types from './types';

const initialState = {
  address: "",
  locale: 'en',
  currency: 'USD',
  activatedList: [],
  borrowingList: [],
  lendingList: [],
  unusedList: []
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {

    case types.SET_ACTIVATED_LIST_SUCCESS:
      return { ...state, activatedList: action.payload }

    case types.SET_ADDRESS_SUCCESS:
      return { ...state, address: action.payload }
    case types.SET_ADDRESS_FAILURE:
      return state;
    
    case types.SET_BORROWING_LIST_SUCCESS:
      return { ...state, borrowingList: action.payload }

    case types.SET_CURRENCY_SUCCESS:
      return { ...state, currency: action.payload };
    
    case types.SET_LENDING_LIST_SUCCESS:
      return { ...state, lendingList: action.payload }
    
    case types.SET_LOCALE_SUCCESS:
      return { ...state, locale: action.payload };
    
    case types.SET_UNUSED_LIST_SUCCESS:
      return { ...state, unusedList: action.payload }
    
    default:
      return state;
  }
}
