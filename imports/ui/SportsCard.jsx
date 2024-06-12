import React from 'react';
import { useNavigate } from 'react-router-dom';

const SportsCard = ({ sportDetails, coachName, roomName }) => {
  const navigate = useNavigate();

  if (!sportDetails) {
    return null; // Or a placeholder/loading state
  }

  const handleCheckout = () => {
    navigate(`/checkout/${sportDetails._id}`);
  };

  return (
    <div className="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{sportDetails.sportName}</h5>
      <p className="text-gray-700">Coach: {coachName}</p>
      <p className="text-gray-700">Room: {roomName}</p>
      <p className="text-gray-700">Time: {sportDetails.time}</p>
      <p className="text-gray-700">Date: {sportDetails.date}</p>
      <p className="text-gray-700">Slots available: {sportDetails.slots}</p>
      <button onClick={handleCheckout} className="mt-4 w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
        Book Now
      </button>
    </div>
  );
};

export default SportsCard;
