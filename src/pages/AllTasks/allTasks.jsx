// import { AddReminder } from "@/components/AddReminder/addReminder";
import { AddReminderSheet } from "@/components/AddReminderSheet/addReminderSheet.jsx";
import {ReminderCapsules} from "@/components/ReminderCapsules/reminderCapsules";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { getPendingReminders } from "@/components/Filters/filters";
import { SortButton } from "@/components/SortingOptions/sortButton";
import { ReminderCapsulesGrid } from "@/components/ReminderCapsules/reminderCapsulesGrid";
import { Button } from "@/components/ui/button";
import { FaTh, FaList } from "react-icons/fa";

export const AllTasks=()=>{
const reminders =useSelector(state=>state.reminders.reminders);
const [pendingReminders, setPendingReminders]=useState([]);
const [isGridView, setIsGridView] = useState(false);
const toggleView = () => {
setIsGridView((prev) => !prev);
};


useEffect(() => {
setPendingReminders(getPendingReminders(reminders));;
}, [reminders]);


return(
<>
    <div className="flex justify-around">
        <div className="flex flex-col">
            <AddReminderSheet />
        </div>
        <div className="flex flex-col">
            <div className="flex ">
                <SortButton reminders={pendingReminders} setReminders={setPendingReminders} />
                <Button onClick={toggleView} variant="outline">
                {isGridView ?
                <FaList size={16} /> :
                <FaTh size={16} />}
            </Button>
            </div>           
        </div>
        

    </div>
    <div>
        {isGridView?(<div>{pendingReminders.length>0?
            <ReminderCapsulesGrid reminders={pendingReminders} />:<p>Congratulations!! You have no pending tasks.</p>}
        </div>):( <div>{pendingReminders.length>0?
            <ReminderCapsules reminders={pendingReminders} />:<p>Congratulations!! You have no pending tasks.</p>}</div>
        )}
    </div>



</>
);

}