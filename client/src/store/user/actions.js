import * as types from './types.js';

export function setUserLocale(locale) {
  return { type: types.SET_LOCALE_SUCCESS, payload: locale }
}

export function setUserCurrency(currency) {
  return { type: types.SET_CURRENCY_SUCCESS, payload: currency }
}
