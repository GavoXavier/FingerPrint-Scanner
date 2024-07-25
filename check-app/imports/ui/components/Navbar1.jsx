import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { HomeIcon, UserGroupIcon, CreditCardIcon, DocumentReportIcon, LogoutIcon, MenuIcon, XIcon } from '@heroicons/react/solid';

export default function Navbar1() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = () => {
    Meteor.logout(() => {
      navigate('/home');
    });
  };

  return (
    <nav className={`flex flex-col justify-between border-e bg-white dark:bg-gray-800 ${isExpanded ? 'w-64' : 'w-20'} transition-width duration-300`}>
      <div>
        <div className="flex items-center justify-center p-4">
          <img src="/Admin.jpg" alt="Admin" className="h-12 w-12 rounded-full" />
        </div>
        <div className="flex items-center justify-center p-2">
          <button onClick={toggleNavbar}>
            {isExpanded ? <XIcon className="h-6 w-6 text-gray-800 dark:text-gray-100" /> : <MenuIcon className="h-6 w-6 text-gray-800 dark:text-gray-100" />}
          </button>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700">
          <div className="px-2">
            <ul className="space-y-1 border-t border-gray-100 dark:border-gray-700 pt-4">
              <li>
                <Link
                  to="/admin/admin-dashboard"
                  className={`group relative flex items-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white ${isExpanded ? 'justify-start' : 'justify-center'}`}
                >
                  <HomeIcon className="h-5 w-5 opacity-75" />
                  {isExpanded && <span className="ml-4">Admin Dashboard</span>}
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/add-employee"
                  className={`group relative flex items-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white ${isExpanded ? 'justify-start' : 'justify-center'}`}
                >
                  <UserGroupIcon className="h-5 w-5 opacity-75" />
                  {isExpanded && <span className="ml-4">Add Employee</span>}
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/check-list"
                  className={`group relative flex items-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white ${isExpanded ? 'justify-start' : 'justify-center'}`}
                >
                  <CreditCardIcon className="h-5 w-5 opacity-75" />
                  {isExpanded && <span className="ml-4">Check List</span>}
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/employee-list"
                  className={`group relative flex items-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white ${isExpanded ? 'justify-start' : 'justify-center'}`}
                >
                  <DocumentReportIcon className="h-5 w-5 opacity-75" />
                  {isExpanded && <span className="ml-4">Employee List</span>}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2 dark:border-gray-700 dark:bg-gray-800">
        <button
          onClick={handleLogout}
          className={`group relative flex items-center w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white ${isExpanded ? 'justify-start' : 'justify-center'}`}
        >
          <LogoutIcon className="h-5 w-5 opacity-75" />
          {isExpanded && <span className="ml-4">Logout</span>}
        </button>
      </div>
    </nav>
  );
}
