import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reminders: [],
};

const reminderSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    addReminder: (state, action) => {
      const { id, title, description, dueDate, completionStatus, priority } = action.payload;
      state.reminders.push({ id, title, description, dueDate, completionStatus, priority });
    },
    editReminder: (state, action) => {
      const { id, title, description, dueDate, priority } = action.payload;
      const existingReminder = state.reminders.find(reminder => reminder.id === id);
      if (existingReminder) {
        existingReminder.title = title;
        existingReminder.description = description;
        existingReminder.dueDate = dueDate;
        existingReminder.priority=priority;
      }
    },
    deleteReminder: (state, action) => {
      const reminderId = action.payload;
      state.reminders = state.reminders.filter(reminder => reminder.id !== reminderId);
    },
    completeReminder: (state, action)=> {
      const reminderId = action.payload;
      const completedReminder = state.reminders.find(reminder => reminder.id === reminderId);
      if(completedReminder)
        {
          completedReminder.completionStatus= !completedReminder.completionStatus;
        }
    },
  },
});

export const { addReminder, editReminder, deleteReminder, completeReminder } = reminderSlice.actions;
export default reminderSlice.reducer;
