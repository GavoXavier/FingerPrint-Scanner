import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid'; // Assuming you have Heroicons installed

export default function AddEmployee() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('Supervisor');
  const [contact, setContact] = useState('');
  const [showNotification, setShowNotification] = useState(false);

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
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Add Employees</h1>
      <form 
        onSubmit={handleSubmit} 
        className="space-y-4 bg-white dark:bg-gray-800 p-8 md:p-12 rounded-md shadow-md backdrop-filter backdrop-blur-lg bg-opacity-70 dark:bg-opacity-70 hover:bg-opacity-80 dark:hover:bg-opacity-80 transition duration-300 w-full max-w-2xl"
      >
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
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md dark:bg-blue-700 dark:hover:bg-blue-600">
          Add Employee
        </button>
      </form>
      <Transition
        show={showNotification}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 -translate-y-4 scale-95"
        enterTo="opacity-100 translate-y-0 scale-100"
        leave="transition ease-in duration-300 transform"
        leaveFrom="opacity-100 translate-y-0 scale-100"
        leaveTo="opacity-0 -translate-y-4 scale-95"
      >
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2">
          <CheckCircleIcon className="w-6 h-6 text-white" />
          <span>Employee added successfully!</span>
        </div>
      </Transition>
    </div>
  );
}
