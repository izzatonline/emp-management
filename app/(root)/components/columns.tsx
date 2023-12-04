"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";

export type Employee = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  age: number;
  salary: number;
  isActive: boolean;
};

type HandleEditFunction = (employee: Employee) => void;
type HandleDeleteFunction = (employee: Employee) => void;

export function getColumns(
  handleEdit: HandleEditFunction,
  handleDelete: HandleDeleteFunction
) {
  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "first_name",
      header: "First Name",
    },
    {
      accessorKey: "last_name",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "age",
      header: "Age",
    },
    {
      accessorKey: "salary",
      header: "Salary",
      cell: (info) => `$${info.getValue()}`,
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.original.isActive;
        return (
          <div className="flex justify-start">
            {/* Desktop View */}
            <div className="hidden sm:block">
              <Badge
                className={`item-center w-24 h-5 justify-center text-white ${
                  isActive ? "bg-green-400 hover:bg-green-400" : "bg-slate-500"
                }`}
                variant={isActive ? "secondary" : "default"}
              >
                {isActive ? "Active" : "Deactivated"}
              </Badge>
            </div>
            {/* Mobile View */}
            <div className="sm:hidden">
              <span
                className={`inline-block h-3 w-3 rounded-full ${
                  isActive ? "bg-green-400" : "bg-slate-500"
                }`}
              />
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "avatar",
      header: "Avatar",
      cell: ({ row }) => (
        <Image
          src={row.original.avatar}
          alt={`${row.original.first_name} ${row.original.last_name}`}
          width={40}
          height={40}
          className="rounded-full"
        />
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-3">
          <button onClick={() => handleEdit(row.original)}>
            <Edit fontSize="medium" />
          </button>
          <button onClick={() => handleDelete(row.original)}>
            <Trash fontSize="medium" color="red" />
          </button>
        </div>
      ),
    },
  ];

  return columns;
}
