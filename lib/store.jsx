'use client';
import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers'
import userSlice from './UserSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
  },
  //   reducer: rootReducer,
});

export default store;
