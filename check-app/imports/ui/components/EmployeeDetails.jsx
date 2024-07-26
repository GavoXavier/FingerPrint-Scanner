import React from 'react';

export default function EmployeeDetails({ employee, onClose }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employee Details</h2>
      <p><strong>Full Name:</strong> {employee.fullName}</p>
      <p><strong>Role:</strong> {employee.role}</p>
      <p><strong>Age:</strong> {employee.age}</p>
      <p><strong>Contact:</strong> {employee.contact}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      {/* Add other details here */}
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-300 rounded-lg">
        Close
      </button>
    </div>
  );
}
