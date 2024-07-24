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
    <nav className="fixed top-0 left-0 right-0 bg-transparent p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-6">
          {routes.map((route) => (
            <li key={route.path} className="relative group">
              <Link
                to={route.path}
                className={`relative text-black px-4 py-2 rounded-full overflow-hidden transition-transform duration-300 border-2 border-transparent ${
                  location.pathname === route.path ? 'text-white bg-orange-500' : 'hover:text-white'
                }`}
              >
                <span className="relative z-10">{route.label}</span>
                <div className="absolute inset-0 w-full h-full bg-orange-500 transition-transform duration-500 transform scale-x-0 group-hover:scale-x-100 rounded-full"></div>
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="relative text-white px-4 py-2 rounded-full transition-transform duration-300 hover:bg-transparent hover:text-red-500 border-2 border-transparent overflow-hidden flex items-center space-x-2 group"
        >
          <i className="fas fa-sign-out-alt relative z-10"></i>
          <span className="relative z-10">Logout</span>
          <div className="absolute inset-0 w-full h-full bg-red-500 transition-transform duration-500 transform scale-x-0 group-hover:scale-x-100 rounded-full"></div>
        </button>
      </div>
    </nav>
  );
}
