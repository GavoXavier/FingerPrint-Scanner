import React, { useState, useEffect } from 'react';
import { Employees } from '../../api/employees';
import { Tracker } from 'meteor/tracker';
import { CheckLogs } from '../../api/checkLogs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EmployeeListContainer() {
  const [employees, setEmployees] = useState([]);
  const [checkLogs, setCheckLogs] = useState([]);

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

  useEffect(() => {
    const handle = Meteor.subscribe('checkLogs');
    const computation = Tracker.autorun(() => {
      if (handle.ready()) {
        const logs = CheckLogs.find({}, { sort: { checkInTimestamp: -1 } }).fetch();
        setCheckLogs(logs);
      }
    });

    return () => computation.stop();
  }, []);

  const handleRemove = (employeeId, fullName) => {
    const confirmed = window.confirm(`Are you sure you want to remove ${fullName} from the system?`);
    if (confirmed) {
      Meteor.call('employees.remove', employeeId, (error) => {
        if (error) {
          toast.error('Error removing employee: ' + error.reason);
        } else {
          toast.success(`${fullName} has been removed from the system.`);
          // Refresh the employee list after removing
          setEmployees((prev) => prev.filter(employee => employee._id !== employeeId));
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Employee List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {employees.map((employee) => (
            <div key={employee._id} className="relative p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-20 blur-md"></div>
              <div className="relative flex items-center space-x-4">
                <img
                  src="/user.webp"
                  alt="Profile"
                  className="w-16 h-16 rounded-full border-2 border-gray-300"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{employee.fullName}</h3>
                  <p className="text-gray-600 dark:text-gray-400">Role: {employee.role}</p>
                  <p className="text-gray-600 dark:text-gray-400">Age: {employee.age}</p>
                  <p className="text-gray-600 dark:text-gray-400">Contact: {employee.contact}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(employee._id, employee.fullName)}
                className="relative mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
