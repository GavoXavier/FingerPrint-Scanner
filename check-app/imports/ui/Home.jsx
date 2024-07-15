import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../api/employees';
import { Tracker } from 'meteor/tracker';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUsername, setSelectedUsername] = useState('');
  const [employees, setEmployees] = useState([]);
  const [status, setStatus] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handle = Meteor.subscribe('employees');
    const computation = Tracker.autorun(() => {
      if (handle.ready()) {
        const fetchedEmployees = Employees.find().fetch();
        setEmployees(fetchedEmployees);
      }
    });

    return () => computation.stop();
  }, []);

  const handleLogin = () => {
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        alert('Login failed: ' + error.reason);
      } else {
        if (email === 'admin@example.com') {
          navigate('/admin');
        } else {
          alert('Invalid admin credentials');
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Welcome to the Employee Check-In System</h1>
      <div className="mt-4">
        <input
          type="email"
          placeholder="Enter Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-3 py-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full px-3 py-2 border rounded-md"
        />
        <button
          onClick={handleLogin}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Login as Admin
        </button>
      </div>
      <div className="mt-4">
        <select
          value={selectedUsername}
          onChange={(e) => setSelectedUsername(e.target.value)}
          className="block w-full px-3 py-2 border rounded-md"
        >
          <option value="">Select Employee</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee.username}>
              {employee.username}
            </option>
          ))}
        </select>
        {status && (
          <div className="mt-4">
            <span className={`px-4 py-2 ${status === 'Checked in' ? 'bg-green-500' : 'bg-red-500'} text-white rounded-md`}>
              {status}
            </span>
            <p>{status} at {timestamp}</p>
          </div>
        )}
      </div>
    </div>
  );
}
