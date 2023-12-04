import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Employee } from "@/app/(root)/components/columns";

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
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

const employeeSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  isActive: z.boolean(),
  age: z.number(),
  salary: z.number(),
  avatar: z.string().optional(),
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
  const [avatarFile, setAvatarFile] = useState(null);

  const form = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      isActive: false,
      age: 0,
      salary: 0,
      avatar: "",
    },
  });

  useEffect(() => {
    form.reset({
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      isActive: employee.isActive,
      age: employee.age,
      salary: employee.salary,
      avatar: employee.avatar,
    });
  }, [employee, form.reset]);

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { errors } = form.formState;
  useEffect(() => {
    console.log("Form Errors:", errors);
  }, [errors]);

  const onSubmit = (data) => {
    console.log("Submitting Form Data:", data);
    const updatedEmployeeData = {
      ...employee,
      ...data,
      avatar: avatarFile || employee.avatar,
    };
    onSave(updatedEmployeeData);
    if (avatarFile) {
      localStorage.setItem(`avatar_${updatedEmployeeData.id}`, avatarFile);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>
              Make changes to the employee details here. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <DialogTitle>First Name</DialogTitle>
            <Controller
              name="first_name"
              control={form.control}
              render={({ field }) => (
                <Input {...field} id="first_name" className="col-span-3" />
              )}
            />
            <DialogTitle>Last Name</DialogTitle>
            <Controller
              name="last_name"
              control={form.control}
              render={({ field }) => (
                <Input {...field} id="last_name" className="col-span-3" />
              )}
            />
            <DialogTitle>Email</DialogTitle>
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <Input {...field} id="email" className="col-span-3" />
              )}
            />
            <DialogTitle>Age</DialogTitle>
            <Controller
              name="age"
              control={form.control}
              render={({ field }) => (
                <Input {...field} id="age" className="col-span-3" />
              )}
            />
            <DialogTitle>Salary</DialogTitle>
            <Controller
              name="salary"
              control={form.control}
              render={({ field }) => (
                <Input {...field} id="salary" className="col-span-3" />
              )}
            />
            <div className="flex justify-between">
              <DialogTitle>Status</DialogTitle>
              <Controller
                name="isActive"
                control={form.control}
                render={({ field }) => <Switch {...field} id="status" />}
              />
            </div>

            {/* Avatar Upload */}
            <div className="flex gap-2">
              <DialogTitle>Avatar</DialogTitle>
              <input type="file" id="avatar" onChange={handleAvatarChange} />
              {avatarFile && (
                <Image
                  src={avatarFile}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full"
                  width={40}
                  height={40}
                />
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
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
