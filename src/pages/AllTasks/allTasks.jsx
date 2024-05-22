// import { AddReminder } from "@/components/AddReminder/addReminder";
import { AddReminderSheet } from "@/components/AddReminderSheet/addReminderSheet.jsx";
import {ReminderCapsules} from "@/components/ReminderCapsules/reminderCapsules";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { getPendingReminders } from "@/components/Filters/filters";
import { SortButton } from "@/components/SortingOptions/sortButton";
import { ReminderCapsulesGrid } from "@/components/ReminderCapsules/reminderCapsulesGrid";
import { Button } from "@/components/ui/button";
import { FaTh, FaList } from "react-icons/fa";
import { fetchRemindersAsync } from "@/redux/slice/reminderSlice";
import { auth } from "@/config/firebase-config";

export const AllTasks=()=>{
const dispatch=useDispatch();
useEffect(()=>{
    if(auth?.currentUser?.email){
        dispatch(fetchRemindersAsync())
    }
    
})
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
                <Button className="mx-[5px]" onClick={toggleView} variant="outline">
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