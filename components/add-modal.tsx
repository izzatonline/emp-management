import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const employeeSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  isActive: z.boolean(),
  age: z.number(),
  salary: z.number(),
  avatar: z.string().optional(),
});

export function AddEmployee({
  onAdd,
  open,
  setOpen,
}: {
  onAdd: (newEmployee: any) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const form = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      isActive: true,
      age: 0,
      salary: 0,
      avatar: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Submitting Form Data:", data);
    onAdd(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>
              Enter the details of the new employee.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="first_name">First Name</Label>
            <Controller
              name="first_name"
              control={form.control}
              render={({ field }) => <Input {...field} id="first_name" />}
            />

            <Label htmlFor="last_name">Last Name</Label>
            <Controller
              name="last_name"
              control={form.control}
              render={({ field }) => <Input {...field} id="last_name" />}
            />

            <Label htmlFor="email">Email</Label>
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => <Input {...field} id="email" />}
            />

            <Label htmlFor="age">Age</Label>
            <Controller
              name="age"
              control={form.control}
              render={({ field }) => (
                <Input type="number" {...field} id="age" />
              )}
            />

            <Label htmlFor="salary">Salary</Label>
            <Controller
              name="salary"
              control={form.control}
              render={({ field }) => (
                <Input type="number" {...field} id="salary" />
              )}
            />

            <div className="flex items-center justify-between">
              <Label htmlFor="isActive">Status</Label>
              <Controller
                name="isActive"
                control={form.control}
                render={({ field }) => <Switch {...field} id="isActive" />}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Employee</Button>
            <Button
              type="button"
              onClick={() => setOpen(false)}
              variant="destructive"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
