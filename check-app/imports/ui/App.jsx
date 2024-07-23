// imports/ui/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import Home from './Home';
import UserProfile from './components/UserProfile';


export function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        
        <Route path="/user-profile/:userId" element={<UserProfile />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </Router>
  );
}
