import { createSlice } from '@reduxjs/toolkit';
import { getUserReminders, addUserReminder, deleteUserReminder, editUserReminder } from '@/helper/reminderUser';
import { auth } from '@/config/firebase-config';


const initialState = {
  reminders: [],
  status: 'idle',
  error: null,
};
export const fetchRemindersAsync = () => async (dispatch) => {
  try {
      const userId = auth.currentUser.uid;
      const userReminders = await getUserReminders(userId);
      dispatch(setReminders(userReminders));
  } catch (error) {
      dispatch(reminderError(error.message));
  }
};

export const addReminderAsync = (reminderData) => async (dispatch) => {
  try {
      const userId = auth.currentUser.uid;
      reminderData = await addUserReminder(userId, reminderData);
      dispatch(addReminder(reminderData));
  } catch (error) {
      dispatch(reminderError(error.message));
  }
};

export const deleteReminderAsync = (reminderId) => async (dispatch) => {
  try {
      const userId = auth.currentUser.uid;
      await deleteUserReminder(userId, reminderId);
      dispatch(deleteReminder(reminderId));
  } catch (error) {
      dispatch(reminderError(error.message));
  }
};

export const editReminderAsync = (reminderId, updatedReminderData) => async (dispatch) => {
  try {
      const userId = auth.currentUser.uid;
      await editUserReminder(userId, reminderId, updatedReminderData);
      dispatch(editReminder({ id: reminderId, ...updatedReminderData }));
  } catch (error) {
      dispatch(reminderError(error.message));
  }
};

export const completeReminderAsync = (reminderId, updatedReminderData) => async (dispatch) => {
  try {
      const userId = auth.currentUser.uid;
      updatedReminderData = { ...updatedReminderData, completionStatus: !updatedReminderData.completionStatus };
      await editUserReminder(userId, reminderId, updatedReminderData);
      dispatch(completeReminder(reminderId));
      
  } catch (error) {
      dispatch(reminderError(error.message));
  }
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
    reminderError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      
  },
   setReminders: (state, action) => {
      state.reminders = action.payload;
      state.status = 'successful';
   },
   clearReminders: (state) => {
      state.reminders = [];
   },
     },
});

export const { addReminder, editReminder, deleteReminder, completeReminder, reminderError, setReminders, clearReminders } = reminderSlice.actions;
export default reminderSlice.reducer;
