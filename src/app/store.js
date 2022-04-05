// This file is for the error handlers -- (reduces what the issues are)
// ====================================================================================================================
// Holder for everything data transfer
//THink of a literal store
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dotReducer from '../features/dots/dotSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dots: dotReducer,
  },
});
