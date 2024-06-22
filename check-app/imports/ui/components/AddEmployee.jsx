import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export default function AddEmployee() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('Supervisor');
  const [contact, setContact] = useState('');
  const [fingerprintId, setFingerprintId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fingerprintId.length !== 3 || !/^[A-Z]+$/.test(fingerprintId)) {
      alert('Fingerprint ID must be exactly 3 uppercase characters.');
      return;
    }

    const profilePictureUrl = profilePicture ? URL.createObjectURL(profilePicture) : '';

    Meteor.call('employees.insert', profilePictureUrl, fullName, parseInt(age), role, contact, fingerprintId, (error) => {
      if (error) {
        alert('Error adding employee: ' + (error.reason || error.message));
      } else {
        setProfilePicture(null);
        setFullName('');
        setAge('');
        setRole('Supervisor');
        setContact('');
        setFingerprintId('');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setProfilePicture(e.target.files[0])}
        className="block w-full px-3 py-2 border rounded-md"
      />
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
        placeholder="Age"
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
        type="text"
        placeholder="Fingerprint ID"
        value={fingerprintId}
        onChange={(e) => setFingerprintId(e.target.value)}
        required
        className="block w-full px-3 py-2 border rounded-md"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Employee</button>
    </form>
  );
}
