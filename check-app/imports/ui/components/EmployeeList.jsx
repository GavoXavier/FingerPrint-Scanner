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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {employees.map((employee) => (
        <div key={employee._id} className="p-6 border rounded-lg shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <img
              src="/user.webp"
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{employee.fullName}</h3>
              <p className="text-gray-600 dark:text-gray-400">Role: {employee.role}</p>
              <p className="text-gray-600 dark:text-gray-400">Email: {employee.email}</p>
              <p className="text-gray-600 dark:text-gray-400">Contact: {employee.contact}</p>
            </div>
          </div>
          <button
            onClick={() => handleRemove(employee._id)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
