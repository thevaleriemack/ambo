import * as actions from './actions';
import LocaleCurrency from 'locale-currency';

export function setUserLocale(locale=undefined) {
  if (locale === undefined) {
    locale = (navigator.languages && navigator.languages[0]) ||
              navigator.language ||
              navigator.userLanguage;
  }
  const currency = LocaleCurrency.getCurrency(locale);
  return dispatch => {
    dispatch(actions.setUserLocale(locale));
    dispatch(actions.setUserCurrency(currency));
  }
}

export function setUserCurrency(currency) {
  return dispatch => { dispatch(actions.setUserCurrency(currency)); }
}
