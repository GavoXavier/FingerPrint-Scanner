import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export default function EditEmployee({ employee, onClose }) {
  const [fullName, setFullName] = useState(employee.fullName);
  const [role, setRole] = useState(employee.role);
  const [age, setAge] = useState(employee.age);
  const [contact, setContact] = useState(employee.contact);
  const [username, setUsername] = useState(employee.username);

  const handleSave = () => {
    Meteor.call('employees.update', employee._id, username, fullName, parseInt(age, 10), role, contact, (error) => {
      if (error) {
        alert('Error updating employee: ' + error.reason);
      } else {
        alert('Employee updated successfully!');
        onClose();
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full px-3 py-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="block w-full px-3 py-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full px-3 py-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="block w-full px-3 py-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="block w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">
          Cancel
        </button>
        <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Save
        </button>
      </div>
    </div>
  );
}
