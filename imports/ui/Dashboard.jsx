import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SportsCards from './SportsCards';


export default function Dashboard() {
  const [date, setDate] = useState('');
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
    <div>

      <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 py-8 px-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white text-center mb-4">User Dashboard</h1>
      
        <div className="bg-white shadow rounded-lg p-4 mb-4 w-full max-w-md">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Select Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <SportsCards date={date} />
      
      </div>
    </div>
  );
}
