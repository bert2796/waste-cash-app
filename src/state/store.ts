import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as network } from 'react-native-offline';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import logger from 'redux-logger';

import { appSlice } from './app';
import { categorySlice } from './category';
import { conversationSlice } from './conversation';
import { counterSlice } from './counter';
import { notificationSlice } from './notification';
import { productSlice } from './product';
import { productOfferSlice } from './productOffer';
import { shopSlice } from './shop';
import { userSlice } from './user';

const persistConfig = {
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  // whitelist: ['app', 'counter', 'user'],
  whitelist: ['counter', 'user'],

  // Blacklist (Don't Save Specific Reducers)
  blacklist: [
    'network',
    'app',
    'category',
    'conversation',
    'notification',
    'product',
    'productOffer',
    'shopSlice',
  ],
};

const authPersistConfig = {
  key: 'user',
  // Storage Method (React Native)
  storage: AsyncStorage,
  whitelist: ['token'],
  blacklist: ['isLoading', 'error', 'data'],
};

const rootReducer = combineReducers({
  app: appSlice.reducer,
  category: categorySlice.reducer,
  conversation: conversationSlice.reducer,
  counter: counterSlice.reducer,
  notification: notificationSlice.reducer,
  product: productSlice.reducer,
  productOffer: productOfferSlice.reducer,
  shop: shopSlice.reducer,
  user: persistReducer(authPersistConfig, userSlice.reducer),
  network,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
