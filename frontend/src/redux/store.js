import { configureStore } from '@reduxjs/toolkit';
import choreReducer from './choreSlice';
import childrenReducer from './childSlice'; 

export const store = configureStore({
  reducer: {
    chores: choreReducer,
    children: childrenReducer
  },
});
