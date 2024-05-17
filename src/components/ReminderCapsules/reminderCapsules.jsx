import * as React from "react";
import { useDispatch } from "react-redux";
import { completeReminder } from "@/redux/slice/reminderSlice";
import { EditButton } from "../ButtonsGroup/editButton";
import { DeleteButton } from "../ButtonsGroup/deleteButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const ReminderCapsules = ({ reminders }) => {
  const dispatch = useDispatch();

  const getDueStatus = (dueDateString) => {
    const today = new Date();
    const dueDate = new Date(dueDateString);
    const timeDiff = dueDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff === 0 ? "Due today" : `Due in ${daysDiff} days`;
  };

  return (
    <div className="container mx-auto">
      {reminders.map((reminder) => (
        <div key={reminder.id} className="w-4/5 mx-auto my-4">
          <Card className="w-full p-4">
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={reminder.completionStatus}
                      onChange={() => dispatch(completeReminder(reminder.id))}
                    />
                    <h4 className="w-10">{reminder.priority}</h4>
                    <h4 className="w-40">{reminder.title}</h4>
                    <p className="w-56">{reminder.description}</p>
                    <p className="w-32">{getDueStatus(reminder.dueDate)}</p>
                  </div>
                  <div className="flex space-x-2">
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
