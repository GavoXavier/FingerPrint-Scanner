import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import Home from './Home';
import EmployeeListContainer from './components/EmployeeListContainer';
import UserProfile from './components/UserProfile';
import AddEmployee from './components/AddEmployee';
import CheckList from './components/CheckList';

export function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/employee-list" element={<EmployeeListContainer />} />
        <Route path="/user-profile/:userId" element={<UserProfile />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/check-list" element={<CheckList />} />
      </Routes>
    </Router>
  );
}
