import * as React from "react";
import { useDispatch } from "react-redux";
import { completeReminder, completeReminderAsync } from "@/redux/slice/reminderSlice";
import { EditButton } from "../ButtonsGroup/editButton";
import { DeleteButton } from "../ButtonsGroup/deleteButton";
import { Card, CardContent } from "@/components/ui/card";

export const ReminderCapsulesGrid = ({ reminders }) => {
  const dispatch = useDispatch();
  const getDueStatus = (dueDateString) => {
    const today = new Date();
    const dueDate = new Date(dueDateString);
    const timeDiff = dueDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff === 0 ? "Due today" : `Due in ${daysDiff} days`;
  };
  const handleCheckbox=(reminderId,reminder)=>{
    if(auth.currentUser==null){
      dispatch(completeReminder(reminderId))
      }
    else{
      dispatch(completeReminderAsync(reminderId, reminder))
    }
  }

  return (
    <div className="container w-4/5 mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reminders.map((reminder) => (
          <Card key={reminder.id} className="p-4">
            <CardContent className="p-0">
              <div className="flex flex-col  h-full">
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={reminder.completionStatus}
                    onChange={()=>handleCheckbox(reminder.id, reminder)}
                  />
                  <h3 className="text-lg font-semibold">{reminder.title}</h3>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-500 mb-2">{reminder.description}</p>
                  <p className="text-sm text-gray-400">{reminder.priority}-priority{getDueStatus(reminder.dueDate)}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <EditButton reminder={reminder} />
                  <DeleteButton reminderId={reminder.id} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
