import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Sessions } from '../api/Sessions';

export default function Checkout() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    picture: '',
    walletBalance: 0,
    gender: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const handle = Tracker.autorun(() => {
      Meteor.subscribe('sessions');
      const sessionData = Sessions.findOne(sessionId);
      setSession(sessionData);

      const user = Meteor.user();
      if (user && user.profile) {
        setProfile({
          firstName: user.profile.firstName || '',
          lastName: user.profile.lastName || '',
          picture: user.profile.picture || '',
          walletBalance: user.profile.walletBalance || 0,
          gender: user.profile.gender || '',
          phoneNumber: user.profile.phoneNumber || ''
        });
      }
    });

    return () => handle.stop();
  }, [sessionId]);

  const handlePay = () => {
    if (profile.walletBalance < session.fee) {
      alert('Insufficient funds in wallet');
      return;
    }

    const bookingData = {
      sessionId,
      username: Meteor.user().username,
      firstName: profile.firstName,
      lastName: profile.lastName,
      gender: profile.gender,
      phoneNumber: profile.phoneNumber
    };

    Meteor.call('sessions.book', bookingData, (error) => {
      if (error) {
        alert('Booking failed: ' + error.reason);
      } else {
        alert('Booking successful!');
        navigate('/bookings');
      }
    });
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 py-8 px-4 flex flex-col items-center justify-center">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Checkout</h2>
        <div className="flex items-center mb-4">
          <img
            className="object-cover h-20 w-20 rounded-full"
            src={profile.picture || 'https://via.placeholder.com/150'}
            alt="Profile"
          />
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{profile.firstName} {profile.lastName}</h3>
            <p className="text-gray-500">Wallet Balance: KES {profile.walletBalance.toFixed(2)}</p>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Session</label>
          <p className="text-gray-700">{session.sportName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Coach</label>
          <p className="text-gray-700">{session.coachId}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <p className="text-gray-700">{session.time}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Venue</label>
          <p className="text-gray-700">{session.roomId}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Payment Fee</label>
          <p className="text-gray-700">KES {session.fee.toFixed(2)}</p>
        </div>
        <button
          onClick={handlePay}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
