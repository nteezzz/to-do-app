import { Button } from "@/components/ui/button"
import {
AlertDialog,
AlertDialogCancel,
AlertDialogContent,
AlertDialogDescription,
AlertDialogFooter,
AlertDialogHeader,
AlertDialogTitle,
AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteReminder, deleteReminderAsync} from "@/redux/slice/reminderSlice.jsx"
import { useDispatch } from "react-redux"
import { FaTrash } from "react-icons/fa";
import { auth } from "@/config/firebase-config";

export function DeleteButton({reminderId}) {
 
const dispatch = useDispatch();
const handleDelete = () =>{
    if(auth.currentUser==null){
        dispatch(deleteReminder(reminderId))
    }
    else{
        dispatch(deleteReminderAsync(reminderId))
    }   

}

return (
<>
    <AlertDialog>
        <AlertDialogTrigger asChild>
        <span className="flex items-center space-x-2 cursor-pointer ">
          <FaTrash />
          <span className="hidden lg:block" >Delete</span>
        </span>
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
</>
)
}