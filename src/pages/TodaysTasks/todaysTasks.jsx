import { AddReminderSheet } from "@/components/AddReminderSheet/addReminderSheet.jsx";
import {ReminderCapsules} from "@/components/ReminderCapsules/reminderCapsules";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getPendingReminders, getTodaysReminders } from "@/components/Filters/filters";
import { SortButton } from "@/components/SortingOptions/sortButton";

export const TodaysTasks=()=>{
    const reminders =useSelector(state=>state.reminders.reminders);
    const pendingReminders= getPendingReminders(reminders);
    const [todaysReminders,setTodaysReminders]=useState([]);
    useEffect(() => {
        setTodaysReminders(getTodaysReminders(pendingReminders));
    }, [reminders]); ;

return(
<>
<div className="flex justify-between">
        <div className="flex flex-col"><AddReminderSheet /></div>
        <div className="flex flex-col"><SortButton reminders={todaysReminders} setReminders={setTodaysReminders} /></div>
    </div>
    {todaysReminders.length>0?<ReminderCapsules reminders={todaysReminders}/>:<p>Congratulations!! You have no pending tasks for today</p>}
    
</>
);

}