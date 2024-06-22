import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar1({ onAddEmployeeClick, onShowCheckListClick, onShowApprovalRequestsClick }) {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-white">Home</Link></li>
        <li><Link to="/admin" className="text-white">Admin Dashboard</Link></li>
        <li><button onClick={onAddEmployeeClick} className="text-white">Add Employee</button></li>
        <li><button onClick={onShowCheckListClick} className="text-white">Check List</button></li>
        <li><button onClick={onShowApprovalRequestsClick} className="text-white">Approval Requests</button></li>
        <li><Link to="/employee-list" className="text-white">Employee List</Link></li>
      </ul>
    </nav>
  );
}
