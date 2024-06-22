import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './accounts/Login';
import Register from './accounts/Register';
import Dashboard from './Dashboard';
import UserBookings from './UserBookings';
import CreateSessionForm from './admin/CreateSessionForm';
import AdminSessionsList from './admin/AdminSessionsList';
import AdminUsersList from './admin/AdminUsersList';
import AdminBookingStatistics from './admin/AdminBookingStatistics';
import CreateCoachForm from './admin/CreateCoachForm';
import AdminCoachesList from './admin/AdminCoachesList';
import ManageRooms from './admin/ManageRooms';
import SessionsList from './SessionsList';
import CoachesList from './CoachesList';
import RoomsList from './RoomsList';
import Profile from './Profile';
import UserLayout from './UserLayout';
import Checkout from './Checkout';
import AdminPanel from './admin/AdminPanel';
import AdminUnbookingRequests from './admin/AdminUnbookingRequests';
import AdminPaymentConfirmations from './admin/AdminPaymentConfirmations';
import Paybill from './Paybill';
import Wallet from './Wallet';
import WalletPayment from './WalletPayment'; // Import WalletPayment component

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<UserBookings />} />
          <Route path="/sessions-list" element={<SessionsList />} />
          <Route path="/coaches-list" element={<CoachesList />} />
          <Route path="/rooms-list" element={<RoomsList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout/:sessionId" element={<Checkout />} />
          <Route path="/paybill/:sessionId" element={<Paybill />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/wallet-payment/:sessionId" element={<WalletPayment />} /> // Add WalletPayment route
        </Route>
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="create-session" element={<CreateSessionForm />} />
          <Route path="session-list" element={<AdminSessionsList />} />
          <Route path="user-list" element={<AdminUsersList />} />
          <Route path="booking-statistics" element={<AdminBookingStatistics />} />
          <Route path="create-coach" element={<CreateCoachForm />} />
          <Route path="coach-list" element={<AdminCoachesList />} />
          <Route path="manage-rooms" element={<ManageRooms />} />
          <Route path="unbooking-requests" element={<AdminUnbookingRequests />} />
          <Route path="payment-confirmations" element={<AdminPaymentConfirmations />} />
        </Route>
      </Routes>
    </Router>
  );
}
