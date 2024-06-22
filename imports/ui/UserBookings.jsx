import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bookings } from '../api/Bookings';
import { Sessions } from '../api/Sessions';

export default function UserBookings() {
  const bookings = useTracker(() => {
    Meteor.subscribe('userBookings');
    return Bookings.find({ userId: Meteor.userId() }).fetch();
  });

  const sessions = useTracker(() => {
    Meteor.subscribe('sessions');
    return Sessions.find().fetch();
  });

  const handleUnbook = (bookingId, sessionId) => {
    Meteor.call('sessions.unbookRequest', { bookingId, sessionId }, (error) => {
      if (error) {
        alert('Unbooking request failed: ' + error.reason);
      } else {
        alert('Unbooking request sent');
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Session</th>
              <th className="py-2">Date/Time</th>
              <th className="py-2">Venue</th>
              <th className="py-2">Payment Fee</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              const session = sessions.find((s) => s._id === booking.sessionId);
              return (
                <tr key={booking._id} className="border-t">
                  <td className="py-2 px-4">{session ? session.sportName : 'N/A'}</td>
                  <td className="py-2 px-4">{session ? `${session.date} ${session.time}` : 'N/A'}</td>
                  <td className="py-2 px-4">{session ? session.roomId : 'N/A'}</td>
                  <td className="py-2 px-4">KES {session ? session.fee.toFixed(2) : 'N/A'}</td>
                  <td className="py-2 px-4">{booking.status}</td>
                  <td className="py-2 px-4">
                    {booking.status !== 'Unbooked' && booking.status !== 'Awaiting Approval for Unbooking' && (
                      <button
                        onClick={() => handleUnbook(booking._id, booking.sessionId)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Unbook
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
