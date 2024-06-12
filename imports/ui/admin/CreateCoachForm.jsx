import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export default function CreateCoachForm() {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [speciality, setSpeciality] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.call('coaches.create', { fullName, age, gender, contactNumber, speciality });
    setFullName('');
    setAge('');
    setGender('');
    setContactNumber('');
    setSpeciality('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-4">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 rounded-lg shadow">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="w-full px-2 py-1 border rounded shadow-sm"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="w-full px-2 py-1 border rounded shadow-sm"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="w-full px-2 py-1 border rounded shadow-sm"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
          className="w-full px-2 py-1 border rounded shadow-sm"
        />
        <input
          type="text"
          placeholder="Area of Speciality"
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
          required
          className="w-full px-2 py-1 border rounded shadow-sm"
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Coach
        </button>
      </form>
    </div>
  );
}
