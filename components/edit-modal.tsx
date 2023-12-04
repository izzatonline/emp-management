import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Employee } from "@/app/(root)/components/columns";

const employeeSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  isActive: z.boolean(),
});

export function EditEmployee({
  employee,
  onSave,
  open,
  setOpen,
}: {
  employee: Employee;
  onSave: (updatedEmployee: Employee) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const form = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      email: "",
      isActive: false,
    },
  });

  useEffect(() => {
    form.reset({
      name: employee.name,
      email: employee.email,
      isActive: employee.isActive,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee]);

  const onSubmit = (data: z.infer<typeof employeeSchema>) => {
    const updatedEmployeeData = {
      ...data,
      id: employee.id,
    };
    onSave(updatedEmployeeData as Employee);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader className="items-start text-left">
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>
              Make changes to the employee details here. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-left">
                    Name
                  </Label>
                  <Input {...field} id="name" className="col-span-3" />
                </div>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-left">
                    Email
                  </Label>
                  <Input {...field} id="email" className="col-span-3" />
                </div>
              )}
            />
            <Controller
              name="isActive"
              control={form.control}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-left">
                    Status
                  </Label>
                  <Switch
                    id="status"
                    checked={value}
                    onCheckedChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                  />
                </div>
              )}
            />
          </div>
          <DialogFooter className="gap-2">
            <Button type="submit">Save changes</Button>
            <Button type="button" onClick={handleClose} variant="destructive">
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
