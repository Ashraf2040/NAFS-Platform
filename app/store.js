
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice'; 
import questionReducer from './reducers/questionSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    question: questionReducer
  },
});