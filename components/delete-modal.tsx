import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function DeleteEmployee({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-left">
          <DialogTitle>Delete Employee</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this employee?
        </DialogDescription>
        <DialogFooter className="gap-2">
          <Button type="button" onClick={onConfirm} variant="destructive">
            Confirm
          </Button>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
