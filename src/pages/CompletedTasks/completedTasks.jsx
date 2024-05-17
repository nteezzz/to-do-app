
import { AddReminderSheet } from "@/components/AddReminderSheet/addReminderSheet.jsx";
import {ReminderCapsules} from "@/components/ReminderCapsules/reminderCapsules";
import { useSelector } from "react-redux";
import React, { useState,useEffect } from "react";
import { getCompletedReminders } from "@/components/Filters/filters";
import { SortButton } from "@/components/SortingOptions/sortButton";
import { ReminderCapsulesGrid } from "@/components/ReminderCapsules/reminderCapsulesGrid";
import { Button } from "@/components/ui/button";
import { FaTh, FaList } from "react-icons/fa";

export const CompletedTasks=()=>{
    const reminders =useSelector(state=>state.reminders.reminders);
    const [completedReminders, setCompletedReminders]=useState([]);
    const [isGridView, setIsGridView] = useState(false);
    const toggleView = () => {
    setIsGridView((prev) => !prev);
    };
    useEffect(() => {
        setCompletedReminders(getCompletedReminders(reminders));;
    }, [reminders]);

return(
<>
<div className="flex justify-around">
        <div className="flex flex-col">
            <AddReminderSheet />
        </div>
        <div className="flex flex-col">
            <div className="flex ">
                <SortButton reminders={completedReminders} setReminders={setCompletedReminders} />
                <Button onClick={toggleView} variant="outline">
                {isGridView ?
                <FaList size={16} /> :
                <FaTh size={16} />}
            </Button>
            </div>           
        </div>
        

    </div>
    <div>
        {isGridView?(<div>{completedReminders.length>0?
            <ReminderCapsulesGrid reminders={completedReminders} />:<p>Congratulations!! You have no pending tasks.</p>}
        </div>):( <div>{completedReminders.length>0?
            <ReminderCapsules reminders={completedReminders} />:<p>Congratulations!! You have no pending tasks.</p>}</div>
        )}
    </div>
    
</>
);

}