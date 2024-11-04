import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Định nghĩa kiểu RootState và AppDispatch để sử dụng trong TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;