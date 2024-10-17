// import {configureStore} from '@reduxjs/toolkit';
// import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import {rootReducer} from '../reducer/CombineReducer';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
// });

// export const persistor = persistStore(store);

// export type AppDispatch = typeof store.dispatch;

// import {configureStore} from '@reduxjs/toolkit';
// import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import {rootReducer} from '../reducer/CombineReducer'; // Update this path

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// // Create a persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [
//           'persist/PERSIST',
//           'persist/REHYDRATE',
//           'persist/FLUSH',
//           'persist/PAUSE',
//           'persist/REGISTER',
//         ],
//       },
//     }),
// });

// export const persistor = persistStore(store);

// export type AppDispatch = typeof store.dispatch;

import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from '../reducer/CombineReducer'; // Update path as needed

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Use AsyncStorage for React Native
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/FLUSH',
          'persist/PAUSE',
          'persist/REGISTER',
        ],
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
