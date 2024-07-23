// imports/ui/components/Navbar1.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar1() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li><Link to="/admin/admin-dashboard" className="text-white">Admin Dashboard</Link></li>
        <li><Link to="/admin/add-employee" className="text-white">Add Employee</Link></li>
        <li><Link to="/admin/check-list" className="text-white">Check List</Link></li>
        <li><Link to="/admin/employee-list" className="text-white">Employee List</Link></li>
      </ul>
    </nav>
  );
}
