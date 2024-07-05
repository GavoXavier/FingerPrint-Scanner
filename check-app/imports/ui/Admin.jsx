import React, { useState } from 'react';
import Navbar1 from './components/Navbar1';
import AddEmployee from './components/AddEmployee';
import CheckList from './components/CheckList';
import EmployeeListContainer from './components/EmployeeListContainer';

export default function Admin() {
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showCheckList, setShowCheckList] = useState(false);
  const [showEmployeeList, setShowEmployeeList] = useState(false);

  const handleAddEmployeeClick = () => {
    setShowAddEmployee(true);
    setShowCheckList(false);
    setShowEmployeeList(false);
  };

  const handleShowCheckListClick = () => {
    setShowCheckList(true);
    setShowAddEmployee(false);
    setShowEmployeeList(false);
  };

  const handleShowEmployeeListClick = () => {
    setShowEmployeeList(true);
    setShowAddEmployee(false);
    setShowCheckList(false);
  };

  return (
    <div className="admin-dashboard">
      <Navbar1
        onAddEmployeeClick={handleAddEmployeeClick}
        onShowCheckListClick={handleShowCheckListClick}
        onShowEmployeeListClick={handleShowEmployeeListClick}
      />
      <div className="main-content p-4">
        {showAddEmployee && <AddEmployee />}
        {showCheckList && <CheckList />}
        {showEmployeeList && <EmployeeListContainer />}
      </div>
    </div>
  );
}
