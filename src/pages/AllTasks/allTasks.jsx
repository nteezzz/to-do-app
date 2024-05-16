// import { AddReminder } from "@/components/AddReminder/addReminder";
import { AddReminderSheet } from "@/components/AddReminderSheet/addReminderSheet.jsx";
import {ReminderCapsules} from "@/components/ReminderCapsules/reminderCapsules";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { getPendingReminders } from "@/components/Filters/filters";
import { SortButton } from "@/components/SortingOptions/sortButton";

export const AllTasks=()=>{
    const reminders =useSelector(state=>state.reminders.reminders);
    const [pendingReminders, setPendingReminders]=useState([]);
    useEffect(() => {
        setPendingReminders(getPendingReminders(reminders));;
    }, [reminders]);
    

return(
<>
    <div className="flex justify-between">
        <div className="flex flex-col"><AddReminderSheet /></div>
        <div className="flex flex-col"><SortButton reminders={pendingReminders} setReminders={setPendingReminders} /></div>
    </div>
    {/* <TaskList/> */}
    {pendingReminders.length>0?<ReminderCapsules reminders={pendingReminders}/>:<p>Congratulations!! You have no pending tasks.</p>}
</>
);

}