import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { HomeIcon, UserGroupIcon, CreditCardIcon, DocumentReportIcon, LogoutIcon, MenuIcon, XIcon, SunIcon, MoonIcon } from '@heroicons/react/solid';
import ProfileModal from './ProfileModal';

export default function Navbar1({ darkMode, setDarkMode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = () => {
    Meteor.logout(() => {
      navigate('/');
    });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 z-50 flex items-center justify-between w-full bg-gray-900 dark:bg-gray-800 p-4 md:w-64 md:flex-col md:justify-start md:h-full transition-all duration-300 ${isExpanded ? 'bg-opacity-70 backdrop-blur' : 'bg-opacity-70'}`}>
        <div className="flex items-center justify-between w-full md:flex-col md:items-center">
          <img
            src="/Admin.jpg"
            alt="Admin"
            className="h-12 w-12 rounded-full cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
          <button onClick={toggleNavbar} className="md:hidden">
            {isExpanded ? <XIcon className="h-6 w-6 text-gray-100" /> : <MenuIcon className="h-6 w-6 text-gray-100" />}
          </button>
        </div>

        <div className={`mt-4 md:flex md:flex-col md:items-center ${isExpanded ? 'block' : 'hidden md:block'}`}>
          <ul className="space-y-4 w-full">
            <li>
              <Link to="/admin/admin-dashboard" className="flex items-center justify-center md:justify-start px-4 py-2 text-gray-100 rounded-lg hover:bg-gray-700" onClick={toggleNavbar}>
                <HomeIcon className="h-6 w-6" />
                <span className="ml-2">Admin Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/add-employee" className="flex items-center justify-center md:justify-start px-4 py-2 text-gray-100 rounded-lg hover:bg-gray-700" onClick={toggleNavbar}>
                <UserGroupIcon className="h-6 w-6" />
                <span className="ml-2">Add Employee</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/check-list" className="flex items-center justify-center md:justify-start px-4 py-2 text-gray-100 rounded-lg hover:bg-gray-700" onClick={toggleNavbar}>
                <CreditCardIcon className="h-6 w-6" />
                <span className="ml-2">Check List</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/employee-list" className="flex items-center justify-center md:justify-start px-4 py-2 text-gray-100 rounded-lg hover:bg-gray-700" onClick={toggleNavbar}>
                <DocumentReportIcon className="h-6 w-6" />
                <span className="ml-2">Employee List</span>
              </Link>
            </li>
            <li>
              <button onClick={() => { setDarkMode(!darkMode); toggleNavbar(); }} className="flex items-center justify-center md:justify-start p-2 rounded-lg focus:outline-none">
                {darkMode ? <SunIcon className="h-6 w-6 text-yellow-500" /> : <MoonIcon className="h-6 w-6 text-gray-100" />}
                <span className="ml-2">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </li>
            <li>
              <button onClick={() => { handleLogout(); toggleNavbar(); }} className="flex items-center justify-center md:justify-start px-4 py-2 text-sm text-gray-100 rounded-lg hover:bg-gray-700">
                <LogoutIcon className="h-5 w-5" />
                <span className="ml-2">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {isModalOpen && <ProfileModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
