import { combineReducers } from 'redux';

import assets from './assets/reducer';
import eth from './eth/reducer';
import user from './user/reducer';

export default combineReducers({
  assets,
  user,
  eth
});
