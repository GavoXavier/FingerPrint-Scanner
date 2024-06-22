import React, { useState, useEffect } from 'react';
import AddEmployee from './components/AddEmployee';
import Navbar1 from './components/Navbar1';
import CheckList from './components/CheckList';
import ApprovalRequests from './components/ApprovalRequests';
import EmployeeListContainer from './components/EmployeeListContainer';
import { Employees } from '../api/employees';
import { Tracker } from 'meteor/tracker';

export default function Admin() {
  const [employees, setEmployees] = useState([]);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showCheckList, setShowCheckList] = useState(false);
  const [showApprovalRequests, setShowApprovalRequests] = useState(false);
  const [showEmployeeList, setShowEmployeeList] = useState(false);

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

  const handleAddEmployeeClick = () => {
    setShowAddEmployee(!showAddEmployee);
    setShowCheckList(false);
    setShowApprovalRequests(false);
    setShowEmployeeList(false);
  };

  const handleShowCheckListClick = () => {
    setShowCheckList(!showCheckList);
    setShowAddEmployee(false);
    setShowApprovalRequests(false);
    setShowEmployeeList(false);
  };

  const handleShowApprovalRequestsClick = () => {
    setShowApprovalRequests(!showApprovalRequests);
    setShowAddEmployee(false);
    setShowCheckList(false);
    setShowEmployeeList(false);
  };

  const handleShowEmployeeListClick = () => {
    setShowEmployeeList(!showEmployeeList);
    setShowAddEmployee(false);
    setShowCheckList(false);
    setShowApprovalRequests(false);
  };

  return (
    <div className="admin-dashboard">
      <Navbar1
        onAddEmployeeClick={handleAddEmployeeClick}
        onShowCheckListClick={handleShowCheckListClick}
        onShowApprovalRequestsClick={handleShowApprovalRequestsClick}
      />
      <div className="main-content p-4">
        {showAddEmployee && <AddEmployee />}
        {showCheckList && <CheckList />}
        {showApprovalRequests && <ApprovalRequests />}
        {showEmployeeList && <EmployeeListContainer />}
      </div>
    </div>
  );
}
