import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Sessions } from '../../api/Sessions';
import { Bookings } from '../../api/Bookings';

export default function AdminBookingStatistics() {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const handle = Tracker.autorun(() => {
      Meteor.subscribe('sessions');
      Meteor.subscribe('bookings');

      const sessions = Sessions.find().fetch();
      const bookings = Bookings.find().fetch();

      const stats = sessions.map((session) => {
        const sessionBookings = bookings.filter((booking) => booking.sessionId === session._id);
        return {
          sportName: session.sportName,
          date: session.date,
          totalSlots: session.slots,
          bookedSlots: sessionBookings.length,
          remainingSlots: session.slots - sessionBookings.length,
        };
      });

      setStatistics(stats);
    });

    return () => handle.stop();
  }, []);

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800">Booking Statistics</h2>
      <ul className="list-disc pl-5 mt-2">
        {statistics.map((stat, index) => (
          <li key={index} className="mt-1 p-4 bg-gray-100 rounded-lg shadow">
            <div>
              <p><strong>Sport:</strong> {stat.sportName}</p>
              <p><strong>Date:</strong> {stat.date}</p>
              <p><strong>Total Slots:</strong> {stat.totalSlots}</p>
              <p><strong>Booked Slots:</strong> {stat.bookedSlots}</p>
              <p><strong>Remaining Slots:</strong> {stat.remainingSlots}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
