import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const TaskList = () => {
  const reminders = useSelector(state=> state.reminders.reminders);
  const [sortBy, setSortBy] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(key);
      setSortAsc(true);
    }
  };

  const sortedReminders = [...reminders].sort((a, b) => {
    if (sortBy === "priority") {
      return sortAsc ? a.priority.localeCompare(b.priority) : b.priority.localeCompare(a.priority);
    } else if (sortBy === "dueDate") {
      return sortAsc ? new Date(a.dueDate) - new Date(b.dueDate) : new Date(b.dueDate) - new Date(a.dueDate);
    }
    return 0;
  });

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Due Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reminders.map((reminder) => (
          <TableRow key={reminder.id}>
            <TableCell className="font-medium">{reminder.completionStatus}</TableCell>
            <TableCell>{reminder.priority}</TableCell>
            <TableCell>{reminder.title}</TableCell>
            <TableCell>{reminder.description}</TableCell>
            <TableCell className="text-right">{reminder.dueDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          
          
        </TableRow>
      </TableFooter>
    </Table>
  );
};


