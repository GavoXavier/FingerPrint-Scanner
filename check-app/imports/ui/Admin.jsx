import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar1 from './components/Navbar1';
import AddEmployee from './components/AddEmployee';
import CheckList from './components/CheckList';
import EmployeeListContainer from './components/EmployeeListContainer';
import AdminDashboard from './components/AdminDashboard';

export default function Admin() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`flex flex-col ${darkMode ? 'dark' : ''}`}>
      <Navbar1 darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex-grow ml-0 md:ml-64 transition-all duration-300">
        <div className="p-4 sm:p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
          <Routes>
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route path="add-employee" element={<AddEmployee />} />
            <Route path="check-list" element={<CheckList />} />
            <Route path="employee-list" element={<EmployeeListContainer />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
