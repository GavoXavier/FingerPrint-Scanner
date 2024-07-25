import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const routes = [
  { path: '/admin/admin-dashboard', label: 'Admin Dashboard' },
  { path: '/admin/add-employee', label: 'Add Employee' },
  { path: '/admin/check-list', label: 'Check List' },
  { path: '/admin/employee-list', label: 'Employee List' },
];

export default function Navbar1() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout functionality here
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 dark:bg-black bg-opacity-80 dark:bg-opacity-80 p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white text-xl font-bold">Dashboard</Link>
          <div className="hidden md:flex space-x-4">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`text-gray-300 dark:text-gray-100 px-4 py-2 rounded-full transition duration-300 ${
                  location.pathname === route.path
                    ? 'bg-green-600 text-white'
                    : 'hover:bg-green-500 hover:text-white'
                }`}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="text-gray-300 dark:text-gray-100 px-4 py-2 rounded-full transition duration-300 hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        </div>
        <div className="md:hidden">
          <button className="text-gray-300 dark:text-gray-100 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="md:hidden mt-2">
        <div className="space-y-2">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={`block text-gray-300 dark:text-gray-100 px-4 py-2 rounded-full transition duration-300 ${
                location.pathname === route.path
                  ? 'bg-green-600 text-white'
                  : 'hover:bg-green-500 hover:text-white'
              }`}
            >
              {route.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="block w-full text-left text-gray-300 dark:text-gray-100 px-4 py-2 rounded-full transition duration-300 hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
