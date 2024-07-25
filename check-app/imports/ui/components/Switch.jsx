import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/solid'; // Make sure you have Heroicons installed

export default function Switch({ isOn, handleToggle }) {
  return (
    <div
      className={`flex items-center cursor-pointer w-16 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out ${isOn ? 'bg-yellow-500' : 'bg-gray-500'}`}
      onClick={handleToggle}
    >
      <div className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${isOn ? 'translate-x-6' : 'translate-x-0'}`}>
        {isOn ? (
          <SunIcon className="absolute inset-0 w-full h-full text-yellow-500" />
        ) : (
          <MoonIcon className="absolute inset-0 w-full h-full text-gray-300" />
        )}
      </div>
    </div>
  );
}
