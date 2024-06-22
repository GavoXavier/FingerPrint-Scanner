import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate, useParams } from 'react-router-dom';

export default function Paybill() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (/^[A-Z0-9]*$/.test(value) && value.length <= 10) {
      setConfirmationCode(value);
    }
  };

  const handlePaybillPayment = () => {
    if (confirmationCode.length !== 10) {
      alert('Confirmation code must be 10 characters long.');
      return;
    }

    Meteor.call('sessions.book', {
      sessionId,
      userId: Meteor.userId(),
      firstName: Meteor.user().profile.firstName,
      lastName: Meteor.user().profile.lastName,
      gender: Meteor.user().profile.gender,
      phoneNumber: Meteor.user().profile.contactNumber,
      paymentMethod: 'paybill',
      confirmationCode
    }, (error) => {
      if (error) {
        alert('Booking failed: ' + error.reason);
      } else {
        alert('Booking successful. Awaiting payment confirmation.');
        navigate('/bookings');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Enter Paybill Confirmation Code</h2>
        <input
          type="text"
          value={confirmationCode}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded shadow mb-4"
          placeholder="Confirmation Code"
        />
        <button
          onClick={handlePaybillPayment}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
