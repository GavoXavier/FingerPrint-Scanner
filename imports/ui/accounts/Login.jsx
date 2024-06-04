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
        alert('Login Failed: ' + error.reason);
      } else {
        // Redirect based on role
        if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 w-full px-3 py-2 border rounded shadow"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full px-3 py-2 border rounded shadow"
        />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Log In
        </button>
        <p className="mt-4 text-center">
          Don't have an account? <a href="/register" className="text-blue-500 hover:text-blue-700">Register Here</a>
        </p>
      </form>
    </div>
  );
}
