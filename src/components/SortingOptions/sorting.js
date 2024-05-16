const priorityMap = {
  low: 1,
  med: 2,
  high: 3,
};

const sortRemindersLowToHigh = (reminders) => {
  return reminders.slice().sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]);
};

const sortRemindersHighToLow = (reminders) => {
  return reminders.slice().sort((a, b) => priorityMap[b.priority] - priorityMap[a.priority]);
};

const sortRemindersByDueDateAsc = (reminders) => {
    return reminders.slice().sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  };
  
const sortRemindersByDueDateDesc = (reminders) => {
    return reminders.slice().sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  };