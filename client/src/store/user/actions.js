import * as types from './types';

export function setUserActivatedList(list) {
  return { type: types.SET_ACTIVATED_LIST_SUCCESS, payload: list }
}

export function setUserAddress(addr) {
  return { type: types.SET_ADDRESS_SUCCESS, payload: addr }
}

export function setUserAddressFailure(addr) {
  return { type: types.SET_ADDRESS_FAILURE }
}

export function setUserCurrency(currency) {
  return { type: types.SET_CURRENCY_SUCCESS, payload: currency }
}

export function setUserBorrowingList(list) {
  return { type: types.SET_BORROWING_LIST_SUCCESS, payload: list }
}

export function setUserLendingList(list) {
  return { type: types.SET_LENDING_LIST_SUCCESS, payload: list }
}

export function setUserLocale(locale) {
  return { type: types.SET_LOCALE_SUCCESS, payload: locale }
}

export function setUserUnusedList(list) {
  return { type: types.SET_UNUSED_LIST_SUCCESS, payload: list }
}
