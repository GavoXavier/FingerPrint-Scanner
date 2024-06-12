import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

export default function UserLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Meteor.logout((error) => {
      if (error) {
        alert('Logout failed: ' + error.reason);
      } else {
        navigate('/');
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/dashboard" className="hover:text-gray-400">Home Page</Link>
          <div className="relative group">
            <button className="hover:text-gray-400">
              Sessions
            </button>
            <div className="absolute hidden group-hover:block bg-gray-800 shadow-lg rounded-lg">
              <Link to="/sessions-list" className="block px-4 py-2 hover:bg-gray-700">Sessions</Link>
              <Link to="/coaches-list" className="block px-4 py-2 hover:bg-gray-700">Coaches</Link>
              <Link to="/rooms-list" className="block px-4 py-2 hover:bg-gray-700">Rooms</Link>
            </div>
          </div>
          <div className="relative group">
            <button className="hover:text-gray-400">
              Profile
            </button>
            <div className="absolute hidden group-hover:block bg-gray-800 shadow-lg rounded-lg">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700">Profile</Link>
              <Link to="/bookings" className="block px-4 py-2 hover:bg-gray-700">My Bookings</Link>
            </div>
          </div>
          <Link to="/deposit-withdraw" className="hover:text-gray-400">Deposit/Withdraw</Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
        >
          Logout
        </button>
      </nav>
      <div className="flex-grow p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
