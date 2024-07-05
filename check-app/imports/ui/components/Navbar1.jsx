import React from 'react';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';

export default function Navbar1({ onAddEmployeeClick, onShowCheckListClick, onShowEmployeeListClick }) {
  const user = useTracker(() => Meteor.user());

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-white">Home
        </Link></li>
        {user && (
          <>
            <li><Link to="/admin" className="text-white">Admin Dashboard</Link></li>
            <li><button onClick={onAddEmployeeClick} className="text-white">Add Employee</button></li>
            <li><button onClick={onShowCheckListClick} className="text-white">Check List</button></li>
            <li><button onClick={onShowEmployeeListClick} className="text-white">Employee List</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}
