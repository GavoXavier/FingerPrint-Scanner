import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';

export default function Switch({ isOn, handleToggle }) {
  return (
    <div className="flex items-center">
      <div
        onClick={handleToggle}
        className={`cursor-pointer w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 ${isOn ? 'bg-blue-500' : 'bg-gray-300'}`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform ${isOn ? 'translate-x-6' : 'translate-x-0'}`}
        >
          {isOn ? <MoonIcon className="w-4 h-4 text-blue-500" /> : <SunIcon className="w-4 h-4 text-yellow-500" />}
        </div>
      </div>
      <span className="ml-2 text-gray-700 dark:text-gray-300">{isOn ? 'Dark Mode' : 'Light Mode'}</span>
    </div>
  );
}
