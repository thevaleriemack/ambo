import { combineReducers } from 'redux';

import assets from './assets/reducer';
import user from './user/reducer';

export default combineReducers({
  assets,
  user
});