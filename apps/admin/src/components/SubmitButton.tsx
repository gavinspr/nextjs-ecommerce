"use client";

import { Button } from "@/components/ui/button";
import { LucideLoader2 } from "lucide-react";
import { LuCheck } from "react-icons/lu";

interface SubmitButtonProps {
  isSubmitting: boolean;
  label: string;
}

export const SubmitButton = ({ isSubmitting, label }: SubmitButtonProps) => (
  <Button
    type="submit"
    disabled={isSubmitting}
    className="flex items-center gap-2"
  >
    {isSubmitting ? (
      <>
        <LucideLoader2 className="h-4 w-4 animate-spin" />
        Saving...
      </>
    ) : (
      <>
        <LuCheck className="h-4 w-4" />
        {label}
      </>
    )}
  </Button>
);
