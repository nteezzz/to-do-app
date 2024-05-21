import { configureStore } from '@reduxjs/toolkit';
import reminderReducer from '../slice/reminderSlice.jsx';
import authReducer from '../slice/authSlice.jsx'

export const store = configureStore({
  reducer: {
    reminders: reminderReducer,
    auth: authReducer,
  },
 
});


