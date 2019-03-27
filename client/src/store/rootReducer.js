import { combineReducers } from 'redux';

import account from './account/reducer';
import assets from './assets/reducer';
import eth from './eth/reducer';
import user from './user/reducer';

export default combineReducers({
  account,
  assets,
  user,
  eth
});
