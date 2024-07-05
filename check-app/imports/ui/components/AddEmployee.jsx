import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export default function AddEmployee() {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('Supervisor');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    Meteor.call('employees.insert', fullName, parseInt(age), role, contact, email, password, (error) => {
      if (error) {
        alert('Error adding employee: ' + (error.reason || error.message));
      } else {
        setFullName('');
        setAge('');
        setRole('Supervisor');
        setContact('');
        setEmail('');
        setPassword('');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        className="block w-full px-3 py-2 border rounded-md"
      />
      <input
        type="number"
        placeholder        ="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
        className="block w-full px-3 py-2 border rounded-md"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
        className="block w-full px-3 py-2 border rounded-md"
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
        className="block w-full px-3 py-2 border rounded-md"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="block w-full px-3 py-2 border rounded-md"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="block w-full px-3 py-2 border rounded-md"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Add Employee
      </button>
    </form>
  );
}

