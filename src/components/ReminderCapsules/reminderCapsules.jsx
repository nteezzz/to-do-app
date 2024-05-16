import * as React from "react"
import { Button } from "@/components/ui/button"
import {
Card,
CardContent,
} from "@/components/ui/card"
import {  useDispatch } from "react-redux"
import {completeReminder } from "@/redux/slice/reminderSlice"
import { EditButton } from "../ButtonsGroup/editButton"
import { DeleteButton } from "../ButtonsGroup/deleteButton"


export const ReminderCapsules=({reminders})=>{
const dispatch= useDispatch();
const getDueStatus = (dueDateString) => {
  const today = new Date();
  const dueDate = new Date(dueDateString);
  const timeDiff = dueDate - today;
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff === 0 ? 'Due today' : `Due in ${daysDiff} days`;
};
return (
<div>
  {reminders.map((reminder)=>
  <Card className="w-4/5 m-[10px] ">
    <CardContent>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-row space-y-1.5 justify-between">
          <div className="flex flew-col space-1.5">
          <input
            type="checkbox"
            checked={reminder.completionStatus}
            onChange={() => dispatch(completeReminder(reminder.id))}
          />
          </div>
          <div className="flex flew-col space-x-1.5 w-[40px] m-[20px] ">
            <h4>{reminder.priority}</h4>
          </div>
          <div className="flex flew-col space-x-1.5 w-[220px]">
            <h4>{reminder.title}</h4>
          </div>
          <div className="flex flew-col space-x-1.5 w-[180px]">
            <p>{reminder.description}</p>
          </div>
          <div className="flex flew-col space-x-1.5 w-[120px]">
            {getDueStatus(reminder.dueDate)}
          </div>
          <div className="flex flex-col space-x-1.5 w-[40px] m-[20px] ">
            <EditButton reminder={reminder} />
          </div>
          <div className="flex flew-col space-x-1.5 w-[40px] m-[20px] ">
            <DeleteButton reminderId={reminder.id} />
          </div>
          </div>
      </div>
    </CardContent>
  </Card>)}
</div>
);
}