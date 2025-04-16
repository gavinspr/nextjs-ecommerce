"use client";

import { Button } from "@/components/ui/button";
import { LuTrash2 } from "react-icons/lu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface DiscardAlertProps {
  onConfirm: () => void;
  isDirty: boolean;
  isSubmitting: boolean;
  message?: string;
}

export const FormDiscardAlertButton = ({
  onConfirm,
  isDirty,
  isSubmitting,
  message = "Are you sure you want to discard all changes? This action cannot be undone.",
}: DiscardAlertProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isDirty) {
      setIsOpen(true);
    } else {
      onConfirm();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="outline"
        type="button"
        className="flex items-center gap-2"
        onClick={handleClick}
        disabled={isSubmitting}
      >
        <LuTrash2 className="h-4 w-4" />
        Discard Changes
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Discard</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Confirm Discard
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
