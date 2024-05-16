import React from "react";

  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  export const SortButton=({reminders, setReminders})=>{
    
    const priorityMap = {
        low: 1,
        med: 2,
        high: 3,
      };
      
      const sortRemindersLowToHigh = () => {
        const lowtohigh = reminders.slice().sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]);
        setReminders(lowtohigh);
        
      };
      
      const sortRemindersHighToLow = () => {
        const hightolow = reminders.slice().sort((a, b) => priorityMap[b.priority] - priorityMap[a.priority]);
        setReminders(hightolow);
      };
      
      const sortRemindersByDueDateAsc = () => {
          const dateasc= reminders.slice().sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
          setReminders(dateasc);
        };
        
      const sortRemindersByDueDateDesc = () => {
          const datedesc= reminders.slice().sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
          setReminders(datedesc);
        };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Sort By</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
         <DropdownMenuGroup>
            <DropdownMenuItem onClick={sortRemindersLowToHigh}>
              <span>Priority (low to high)</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={sortRemindersHighToLow}>
              <span>Priority (high to low)</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={sortRemindersByDueDateAsc}>
              <span>Due Date (earliest to latest)</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={sortRemindersByDueDateDesc}>
              <span>Due Date (latest to earliest)</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>  
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  