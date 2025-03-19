import { combineReducers, configureStore } from '@reduxjs/toolkit';
import adminReducer from './api/adminslice.js';
import { AdminApislice } from './api/Adminapi.jsx';
import {ClientApislice} from "./api/Clientapi.jsx"

const rootreducer = combineReducers({
  user: adminReducer,
  [AdminApislice.reducerPath]: AdminApislice.reducer,
  [ClientApislice.reducerPath]:ClientApislice.reducer,
});

export const Store = configureStore({
  reducer: rootreducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AdminApislice.middleware,ClientApislice.middleware),
});
