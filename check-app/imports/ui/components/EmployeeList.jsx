import React from 'react';
import { Meteor } from 'meteor/meteor';

export default function EmployeeList({ employees }) {
  const handleRemove = (employeeId) => {
    Meteor.call('employees.remove', employeeId, (error) => {
      if (error) {
        alert('Error removing employee: ' + error.reason);
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees.map((employee) => (
        <div key={employee._id} className="p-4 border rounded-md shadow-md">
          <h3 className="text-xl font-bold">{employee.fullName}</h3>
          <p>Role: {employee.role}</p>
          <p>Email: {employee.email}</p>
          <p>Contact: {employee.contact}</p>
          <button
            onClick={() => handleRemove(employee._id)}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
