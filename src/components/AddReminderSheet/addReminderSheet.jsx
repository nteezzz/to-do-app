import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReminder } from "@/redux/slice/reminderSlice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { PlusCircle } from "lucide-react";

export const AddReminderSheet=()=> {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [priorityy, setPriorityy]= useState("low");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const dueDate = date.toISOString();
    const priority= priorityy;
    const newReminder = {
      id: Date.now(),
      title,
      description,
      dueDate,
      completionStatus: false,
      priority,
    };
    dispatch(addReminder(newReminder));
    event.target.reset();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline"> <PlusCircle className="w-5 h-5 mr-1" /> New Reminder</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new reminder</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input id="title" name="title" placeholder="Title" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input id="description" name="description" placeholder="Description" />
            </div>
            <div className="flex flex-col space-y-1.5 mb-6">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                  <Select onValueChange={(value) => setDate(addDays(new Date(), parseInt(value)))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="0">Today</SelectItem>
                      <SelectItem value="1">Tomorrow</SelectItem>
                      <SelectItem value="3">In 3 days</SelectItem>
                      <SelectItem value="7">In a week</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="rounded-md border">
                    <Calendar mode="single" selected={date} onSelect={setDate} />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col space-y-1.5 mb-6">
            <Select  id="priority" name="priority" onValueChange={(value)=>setPriorityy(value)}>
                    <SelectTrigger>
                    <SelectValue placeholder="Priority">{priorityy}</SelectValue>
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="low">low</SelectItem>
                      <SelectItem value="med">medium</SelectItem>
                      <SelectItem value="high">high</SelectItem>
                    </SelectContent>
                  </Select>
            </div>
          </div>
          <SheetFooter className="flex justify-between"> 
          <SheetClose asChild>
          <Button type="submit">Add</Button>
          </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
