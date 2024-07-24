import React from 'react';

export default function Switch({ isOn, handleToggle }) {
  return (
    <div
      className={`flex items-center cursor-pointer ${isOn ? 'bg-blue-600' : 'bg-gray-300'} w-16 h-8 rounded-full p-1`}
      onClick={handleToggle}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${isOn ? 'translate-x-6' : 'translate-x-0'}`}
      ></div>
    </div>
  );
}
