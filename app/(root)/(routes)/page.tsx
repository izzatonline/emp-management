"use client";

import React, { useEffect, useState } from "react";
import { Employee, getColumns } from "../components/columns";
import { DataTable } from "@/components/data-table";
import { EditEmployee } from "@/components/edit-modal";
import { DeleteEmployee } from "@/components/delete-modal";
import Header from "@/components/header";
import { AddEmployee } from "@/components/add-modal";

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null
  );
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

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
    console.log("handleSave called with:", updatedEmployee);
    const newEmployees = employees.map((emp) =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    setEmployees(newEmployees);
    setEditingEmployee(null);
    setEditModalOpen(false);
  };

  useEffect(() => {
    console.log("Updated Employees:", employees);
  }, [employees]);

  const handleAddNewEmployee = (newEmployee) => {
    console.log("Adding new employee:", newEmployee);
    const newId =
      employees.length > 0
        ? Math.max(...employees.map((emp) => emp.id)) + 1
        : 1;
    const employeeToAdd = { ...newEmployee, id: newId };
    console.log("Employee to add:", employeeToAdd);

    setEmployees((currentEmployees) => [...currentEmployees, employeeToAdd]);
    console.log("New employees list:", [...employees, employeeToAdd]);
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
        <AddEmployee
          onAdd={handleAddNewEmployee}
          open={addModalOpen}
          setOpen={setAddModalOpen}
        />
        <DeleteEmployee
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />
      </div>
    </main>
  );
}
