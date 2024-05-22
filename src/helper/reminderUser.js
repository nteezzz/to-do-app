import { collection, addDoc, query, where, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase-config"

export const addUserReminder = async (uid, reminderData) => {
    try {
        console.log("Inside adduserreminder func")
        const docRef = await addDoc(collection(db, `users/${uid}/reminders`), reminderData);
        return { id: docRef.id, ...reminderData };
    } catch (error) {
        alert("Error adding reminder " + error.message);
    }
}
export const getUserReminders = async (uid) => {
    try {
        const q = query(collection(db, `users/${uid}/reminders`));
        const querySnapshot = await getDocs(q);
        const reminders = [];
        querySnapshot.forEach((doc) => {
            reminders.push({ id: doc.id, ...doc.data() });
        });
        return reminders;
    } catch (error) {
        alert("Error fetching reminders " + error.message);
        return [];
    }
}


export const editUserReminder = async (uid, reminderId, updatedReminderData) => {
    try {
        const reminderRef = doc(db, `users/${uid}/reminders`, reminderId);
        await updateDoc(reminderRef, updatedReminderData);
    } catch (error) {
        alert("Error updating reminders " + error.message);
    }
}

export const deleteUserReminder = async (uid, reminderId) => {
    try {
        const reminderRef = doc(db, `users/${uid}/reminders`, reminderId);
        await deleteDoc(reminderRef);

    } catch (error) {
        alert("Error deleting reminder " + error.message);
    }
}