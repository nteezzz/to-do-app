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
import { deleteReminder} from "@/redux/slice/reminderSlice.jsx"
import { useDispatch } from "react-redux"
import { FaTrash } from "react-icons/fa";

export function DeleteButton({reminderId}) {
const dispatch = useDispatch();
const handleDelete = () =>{
dispatch(deleteReminder(reminderId))
}

return (
<>
    <AlertDialog>
        <AlertDialogTrigger asChild>
        <span className="flex items-center space-x-2 cursor-pointer ">
          <FaTrash />
          <span>Delete</span>
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