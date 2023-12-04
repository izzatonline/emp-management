"use client";

import React, { useEffect, useState } from "react";
import { Employee, getColumns } from "../components/columns";
import { DataTable } from "@/components/data-table";
import { EditEmployee } from "@/components/edit-modal";
import { DeleteEmployee } from "@/components/delete-modal";
import Header from "@/components/header";

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null
  );
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch("/employees.json");
      const json = await response.json();
      setEmployees(json.employees);
    };
    fetchEmployees();
  }, []);

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setEditModalOpen(true);
  };

  const handleSave = (updatedEmployee: Employee) => {
    const newEmployees = employees.map((emp) =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    setEmployees(newEmployees);
    setEditingEmployee(null);
    setEditModalOpen(false);
  };

  const handleDeleteRequest = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      setEmployees(employees.filter((emp) => emp.id !== employeeToDelete.id));
    }
    setDeleteModalOpen(false);
    setEmployeeToDelete(null);
  };

  const columns = getColumns(handleEdit, handleDeleteRequest);

  return (
    <main className="flex flex-col justify-between p-2">
      <Header />
      <div className="container mx-auto py-1">
        <DataTable columns={columns} data={employees} />
        {editingEmployee && (
          <EditEmployee
            employee={editingEmployee}
            onSave={handleSave}
            open={editModalOpen}
            setOpen={setEditModalOpen}
          />
        )}
        <DeleteEmployee
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />
      </div>
    </main>
  );
}
