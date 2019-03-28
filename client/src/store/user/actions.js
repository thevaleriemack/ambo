import * as types from './types';

export function setUserActivatedList(list) {
  return { type: types.SET_ACTIVATED_SUCCESS, payload: list }
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

export function setUserLocale(locale) {
  return { type: types.SET_LOCALE_SUCCESS, payload: locale }
}
