
import { AddReminderSheet } from "@/components/AddReminderSheet/addReminderSheet.jsx";
import {ReminderCapsules} from "@/components/ReminderCapsules/reminderCapsules";
import { useSelector } from "react-redux";
import React, { useState,useEffect } from "react";
import { getCompletedReminders } from "@/components/Filters/filters";
import { SortButton } from "@/components/SortingOptions/sortButton";

export const CompletedTasks=()=>{
    const reminders =useSelector(state=>state.reminders.reminders);
    const [completedReminders, setCompletedReminders]=useState([]);
    useEffect(() => {
        setCompletedReminders(getCompletedReminders(reminders));;
    }, [reminders]);

return(
<>
    <div className="flex justify-between">
        <div className="flex flex-col"><AddReminderSheet /></div>
        <div className="flex flex-col"><SortButton reminders={completedReminders} setReminders={setCompletedReminders} /></div>
    </div>
    {completedReminders.length>0?<ReminderCapsules reminders={completedReminders}/>:<p>Completed tasks will be displayed here.</p>}
</>
);

}