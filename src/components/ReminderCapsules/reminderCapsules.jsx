import * as React from "react";
import { useDispatch } from "react-redux";
import { completeReminder, completeReminderAsync } from "@/redux/slice/reminderSlice";
import { EditButton } from "../Buttons/editButton";
import { DeleteButton } from "../Buttons/deleteButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/config/firebase-config";

export const ReminderCapsules = ({ reminders }) => {
  const dispatch = useDispatch();

  const getDueStatus = (dueDateString) => {
    const today = new Date();
    const dueDate = new Date(dueDateString);
    const timeDiff = dueDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff === 0 ? "Due today" : `Due in ${daysDiff} days`;
  };

  const handleCheckbox = (reminderId, reminder) => {
    if (auth?.currentUser?.email) {
      dispatch(completeReminderAsync(reminderId, reminder));
    } else {
      dispatch(completeReminder(reminderId));
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center">
      {reminders.map((reminder) => (
        <div key={reminder.id} className="w-full max-w-3xl my-[5px] flex justify-center">
          <Card className="w-full">
            <CardContent>
              <div className="grid w-full justify-self-center items-center gap-4">
                <div className="flex  gap-x-10 items-center">
                  <div className="flex  items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={reminder.completionStatus}
                      onChange={() => handleCheckbox(reminder.id, reminder)}
                    />
                    <h4 className="w-10">{reminder.priority}</h4>
                    <h4 className="w-40">{reminder.title}</h4>
                    <p className="w-40 hidden md:block">{reminder.description}</p>
                    <p className="w-32">{getDueStatus(reminder.dueDate)}</p>
                  </div>
                  <div className="flex space-x-2 gap-x-3">
                    <EditButton reminder={reminder} />
                    <DeleteButton reminderId={reminder.id} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};
