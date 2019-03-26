import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import storage from 'redux-persist/lib/storage';
import ReduxThunk from 'redux-thunk';

import rootReducer from './rootReducer';

const persistConfig = {
  key: 'amb-root',
  storage,
  stateReconciler: autoMergeLevel1,
  blacklist: ['eth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(
    persistedReducer,
    undefined,
    compose(
      applyMiddleware(ReduxThunk, createLogger())
    )
  );
  let persistor = persistStore(store);
  return { store, persistor }
}
