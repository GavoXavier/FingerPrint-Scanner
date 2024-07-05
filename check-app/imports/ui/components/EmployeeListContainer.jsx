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
    <div className="employee-list-container">
      <div className="main-content p-4">
        <EmployeeList employees={employees} />
      </div>
    </div>
  );
}
