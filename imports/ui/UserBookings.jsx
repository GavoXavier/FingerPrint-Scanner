import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Bookings } from '../api/Bookings';
import { Sessions } from '../api/Sessions';
import { Coaches } from '../api/Coaches';
import { Rooms } from '../api/Rooms';

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const handle = Tracker.autorun(() => {
      Meteor.subscribe('userBookings');
      Meteor.subscribe('sessions');
      Meteor.subscribe('coaches');
      Meteor.subscribe('rooms');

      const bookingData = Bookings.find({ userId: Meteor.userId() }).fetch();
      const bookingDetails = bookingData.map((booking) => {
        const session = Sessions.findOne({ _id: booking.sessionId });
        const coach = session ? Coaches.findOne({ _id: session.coachId }) : {};
        const room = session ? Rooms.findOne({ _id: session.roomId }) : {};
        return {
          ...booking,
          session,
          coach,
          room
        };
      });
      setBookings(bookingDetails);
    });

    return () => handle.stop();
  }, []);

  const handleUnbook = (bookingId) => {
    Meteor.call('sessions.unbookRequest', { bookingId }, (error) => {
      if (error) {
        alert('Unbooking request failed: ' + error.reason);
      } else {
        alert('Unbooking request sent for approval!');
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 py-8 px-4 flex flex-col items-center justify-center">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">My Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-gray-100 p-4 rounded-lg shadow"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {booking.session?.sportName}
                  </h3>
                  <span className="text-green-500">&#10003; Paid</span>
                </div>
                <p>Coach: {booking.coach?.fullName}</p>
                <p>Venue: {booking.room?.name}</p>
                <p>Date: {booking.session?.date}</p>
                <p>Time: {booking.session?.time}</p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleUnbook(booking._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Unbook
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
