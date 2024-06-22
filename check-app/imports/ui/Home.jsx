import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [fingerprintId, setFingerprintId] = useState('');
  const navigate = useNavigate();

  const handleCheckIn = () => {
    if (fingerprintId === 'A') {
      navigate('/admin');
    } else {
      navigate(`/user-profile/${fingerprintId}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Welcome to the Employee Check-In System</h1>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter Fingerprint ID"
          value={fingerprintId}
          onChange={(e) => setFingerprintId(e.target.value)}
          className="block w-full px-3 py-2 border rounded-md"
        />
        <button
          onClick={handleCheckIn}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Check In
        </button>
      </div>
    </div>
  );
}
