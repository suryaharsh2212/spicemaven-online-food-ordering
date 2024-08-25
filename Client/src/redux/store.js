
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import userReducer from './slice';
import cartReducer from './cartslice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'] 
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
    cart: cartReducer,
    
  },
});

const persistor = persistStore(store);

export { store, persistor };
