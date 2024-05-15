import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import {
Dialog,
DialogContent,
DialogFooter,
DialogHeader,
DialogTitle,
DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { editReminder,deleteReminder} from "@/redux/slice/reminderSlice.jsx"
import { useDispatch } from "react-redux"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react"



export function ButtonGroup({reminder}) {
    const [date, setDate] = useState(new Date(reminder.dueDate));
    const [priorityy, setPriorityy] = useState(reminder.priority);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const id=reminder.id;
    const dispatch = useDispatch();
    const handleDelete = () =>{
        dispatch(deleteReminder(reminder.id))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get("title");
        const description = formData.get("description");
        const updatedReminder = {
          id,
          title,
          description,
          dueDate: date.toISOString(),
          priority: priorityy,
        };
        dispatch(editReminder(updatedReminder));
        setIsDialogOpen(false);
      };

return (
<>
    <div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
            <span onClick={() => setIsDialogOpen(true)}>Edit</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Reminder</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input id="title" name="title" defaultValue={`${reminder.title}`} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input id="description" name="description" defaultValue={`${reminder.description}`} />
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
            <Select  id="priority" name="priority"  onValueChange={(value)=>setPriorityy(value)}>
                    <SelectTrigger>
                    <SelectValue placeholder="Priority">{priorityy}</SelectValue>
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="low">low</SelectItem>
                      <SelectItem value="medium">medium</SelectItem>
                      <SelectItem value="high">high</SelectItem>
                    </SelectContent>
                  </Select>
            </div>
          </div>
          <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
        <AlertDialog>
      <AlertDialogTrigger asChild>
      <span>Delete</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            reminder.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
           <Button onClick={handleDelete}>Continue</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
</>
)
}