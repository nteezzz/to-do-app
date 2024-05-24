import { AddReminderSheet } from "@/components/AddReminderSheet/addReminderSheet.jsx";
import {ReminderCapsules} from "@/components/ReminderCapsules/reminderCapsules";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getPendingReminders, getTodaysReminders } from "@/components/Filters/filters";
import { SortButton } from "@/components/SortingOptions/sortButton";
import { ReminderCapsulesGrid } from "@/components/ReminderCapsules/reminderCapsulesGrid";
import { Togglebutton } from "@/components/Buttons/toggleButton";



export const TodaysTasks=()=>{
    const reminders =useSelector(state=>state.reminders.reminders);
    const pendingReminders= getPendingReminders(reminders);
    const [todaysReminders,setTodaysReminders]=useState([]);
    const [isGridView, setIsGridView] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    useEffect(() => {
        setTodaysReminders(getTodaysReminders(pendingReminders));
    }, [reminders]); ;
    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth <= 591) {
            setIsGridView(true);
            setIsMobileView(true);
          } else {
            setIsGridView(false);
            setIsMobileView(false);
          }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

return(
<>
<div className="flex justify-around">
        <div className="flex flex-col">
            <AddReminderSheet />
        </div>
        <div className="flex flex-col">
            <div className="flex ">
                <SortButton reminders={todaysReminders} setReminders={setTodaysReminders} />
                {!isMobileView && (
                <Togglebutton isGridView={isGridView} setIsGridView={setIsGridView}/>)}
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