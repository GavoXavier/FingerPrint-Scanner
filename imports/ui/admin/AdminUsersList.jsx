import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Bookings } from '../../api/Bookings';
import { Sessions } from '../../api/Sessions';
import { Coaches } from '../../api/Coaches';
import { Rooms } from '../../api/Rooms';

export default function AdminUsersList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const handle = Tracker.autorun(() => {
      Meteor.subscribe('bookings');
      Meteor.subscribe('sessions');
      Meteor.subscribe('coaches');
      Meteor.subscribe('rooms');

      const bookingData = Bookings.find().fetch();
      const bookingDetails = bookingData.map((booking) => {
        const session = Sessions.findOne({ _id: booking.sessionId });
        const coach = session ? Coaches.findOne({ _id: session.coachId }) : {};
        const room = session ? Rooms.findOne({ _id: session.roomId }) : {};
        return {
          ...booking,
          session,
          coach,
          room,
        };
      });
      setBookings(bookingDetails);
    });

    return () => handle.stop();
  }, []);

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800">Users</h2>
      <ul className="list-disc pl-5 mt-2">
        {bookings.map((booking) => (
          <li key={booking._id} className="mt-1 p-4 bg-gray-100 rounded-lg shadow">
            <p><strong>Username:</strong> {booking.username}</p>
            <p><strong>Session:</strong> {booking.session?.sportName}</p>
            <p><strong>Venue:</strong> {booking.room?.name}</p>
            <p><strong>Time:</strong> {booking.session?.time}</p>
            <p><strong>Status:</strong> {booking.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
