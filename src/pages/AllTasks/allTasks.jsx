// import { AddReminder } from "@/components/AddReminder/addReminder";
import { AddReminderSheet } from "@/components/AddReminderSheet/addReminderSheet.jsx";
import {ReminderCapsules} from "@/components/ReminderCapsules/reminderCapsules";
import { TaskList } from "@/components/TaskList/taskList";
import React from "react";

export const AllTasks=()=>{


return(
<>
    {/*
    <AddReminder /> */}
    <div className="flex justify-start">
        <AddReminderSheet />
    </div>
    {/* <TaskList/> */}
    <ReminderCapsules/>
</>
);

}