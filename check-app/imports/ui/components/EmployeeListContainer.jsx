import React, { useState, useEffect } from 'react';
import EmployeeList from './EmployeeList';
import { Employees } from '../../api/employees';
import { Tracker } from 'meteor/tracker';

export default function EmployeeListContainer() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const handle = Meteor.subscribe('employees');
    const computation = Tracker.autorun(() => {
      if (handle.ready()) {
        const fetchedEmployees = Employees.find().fetch();
        setEmployees(fetchedEmployees);
      }
    });

    return () => computation.stop();
  }, []);

  return (
    <div className="employee-list-container min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="container mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Employee List</h2>
        {employees.length > 0 ? (
          <EmployeeList employees={employees} />
        ) : (
          <p className="text-gray-600 dark:text-gray-300">Loading employees...</p>
        )}
      </div>
    </div>
  );
}
