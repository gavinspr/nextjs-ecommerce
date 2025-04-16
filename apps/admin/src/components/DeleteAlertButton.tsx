"use client";

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
} from "@/components/ui/alert-dialog";

interface DiscardAlertProps {
  onConfirm: () => void;
  message?: string;
  itemType?: string;
}

export const DeleteAlertButton = ({
  onConfirm,
  message,
  itemType = "item",
}: DiscardAlertProps) => {
  // Use custom message if provided, otherwise use the default with dynamic itemType
  const displayMessage =
    message || `Are you sure you want to delete this ${itemType}?`;
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-red-600 w-full text-left">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
          <AlertDialogDescription>{displayMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Confirm Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
