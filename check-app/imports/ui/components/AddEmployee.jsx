import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export default function AddEmployee() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('Supervisor');
  const [contact, setContact] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    Meteor.call('employees.insert', username, fullName, parseInt(age), role, contact, (error) => {
      if (error) {
        alert('Error adding employee: ' + (error.reason || error.message));
      } else {
        setUsername('');
        setFullName('');
        setAge('');
        setRole('Supervisor');
        setContact('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-70 dark:bg-opacity-70 w-full max-w-md">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-100">Add Employee</h1>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="block w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
          />
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="block w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="block w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="block w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
          >
            <option value="Supervisor">Supervisor</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Admin">Admin</option>
          </select>
          <input
            type="text"
            placeholder="Contact Details"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            className="block w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
          />
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Add Employee
          </button>
        </form>
        {success && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg transition-transform">
            Employee added successfully!
          </div>
        )}
      </div>
    </div>
  );
}
