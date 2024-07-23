// imports/ui/Admin.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar1 from './components/Navbar1';
import AddEmployee from './components/AddEmployee';
import CheckList from './components/CheckList';
import EmployeeListContainer from './components/EmployeeListContainer';
import AdminDashboard from './components/AdminDashboard';

export default function Admin() {
  return (
    <div className="admin-dashboard">
      <Navbar1 />
      <div className="main-content p-4">
        <Routes>
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="check-list" element={<CheckList />} />
          <Route path="employee-list" element={<EmployeeListContainer />} />
        </Routes>
      </div>
    </div>
  );
}
