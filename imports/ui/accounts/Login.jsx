import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        alert(`Login Failed: ${error.reason}`);
      } else {
        if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <form onSubmit={handleSubmit} className="w-full max-w-xs p-8 bg-white rounded-lg shadow-xl">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
          Log In
        </button>
        <p className="mt-4 text-center text-black">
          Don't have an account? <a href="/register" className="text-purple-800 hover:text-blue-400">Register Here</a>
        </p>
      </form>
    </div>
  );
}
