import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import Home from './Home';
import EmployeeListContainer from './components/EmployeeListContainer';
import UserProfile from './components/UserProfile';

export function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/employee-list" element={<EmployeeListContainer />} />
        <Route path="/user-profile/:fingerprintId" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}
