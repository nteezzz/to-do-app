import { configureStore } from '@reduxjs/toolkit';
import reminderReducer from '../slice/reminderSlice.jsx';

export const store = configureStore({
  reducer: {
    reminders: reminderReducer,
  },
 
});


