import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dotReducer from '../features/dots/dotSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dots: dotReducer,
  },
});
