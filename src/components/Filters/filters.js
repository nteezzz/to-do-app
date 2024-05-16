import React from "react";
import { isSameDay, parseISO } from 'date-fns';
export function getCompletedReminders(reminders) {

    return reminders.filter(reminder => reminder.completionStatus);
  }
export function getPendingReminders(reminders){
    return reminders.filter(reminder => !reminder.completionStatus);
}

export function getTodaysReminders(reminders){
  const today = new Date();
  return reminders.filter(reminder => isSameDay(parseISO(reminder.dueDate), today));
}