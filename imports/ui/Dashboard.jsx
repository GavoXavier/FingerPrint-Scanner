import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import SportsCards from './SportsCards';

export default function Dashboard() {
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
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-xl font-bold text-center">User Dashboard</h1>
      <button onClick={handleLogout} className="py-2 px-4 bg-red-500 text-white font-bold rounded hover:bg-red-700 transition duration-300">
        Logout
      </button>
      <SportsCards />
    </div>
  );
}
