import { AddReminderSheet } from "@/components/AddReminderSheet/addReminderSheet.jsx";
import {ReminderCapsules} from "@/components/ReminderCapsules/reminderCapsules";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getPendingReminders, getTodaysReminders } from "@/components/Filters/filters";
import { SortButton } from "@/components/SortingOptions/sortButton";
import { ReminderCapsulesGrid } from "@/components/ReminderCapsules/reminderCapsulesGrid";
import { Button } from "@/components/ui/button";
import { FaTh, FaList } from "react-icons/fa";

export const TodaysTasks=()=>{
    const reminders =useSelector(state=>state.reminders.reminders);
    const pendingReminders= getPendingReminders(reminders);
    const [todaysReminders,setTodaysReminders]=useState([]);
    const [isGridView, setIsGridView] = useState(false);
    const toggleView = () => {
    setIsGridView((prev) => !prev);
    };
    useEffect(() => {
        setTodaysReminders(getTodaysReminders(pendingReminders));
    }, [reminders]); ;

return(
<>
<div className="flex justify-around">
        <div className="flex flex-col">
            <AddReminderSheet />
        </div>
        <div className="flex flex-col">
            <div className="flex ">
                <SortButton reminders={todaysReminders} setReminders={setTodaysReminders} />
                <Button onClick={toggleView} variant="outline">
                {isGridView ?
                <FaList size={16} /> :
                <FaTh size={16} />}
            </Button>
            </div>           
        </div>
        

    </div>
    <div>
        {isGridView?(<div>{todaysReminders.length>0?
            <ReminderCapsulesGrid reminders={todaysReminders} />:<p>Congratulations!! You have no pending tasks.</p>}
        </div>):( <div>{todaysReminders.length>0?
            <ReminderCapsules reminders={todaysReminders} />:<p>Congratulations!! You have no pending tasks.</p>}</div>
        )}
    </div>
</>
);

}