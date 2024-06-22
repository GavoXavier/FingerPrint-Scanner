import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Bookings } from '../../api/Bookings';
import { Sessions } from '../../api/Sessions';
import { Coaches } from '../../api/Coaches';
import { Rooms } from '../../api/Rooms';

export default function AdminUnbookingRequests() {
  const [unbookingRequests, setUnbookingRequests] = useState([]);

  useEffect(() => {
    const handle = Tracker.autorun(() => {
      Meteor.subscribe('unbookingRequests');
      Meteor.subscribe('sessions');
      Meteor.subscribe('coaches');
      Meteor.subscribe('rooms');

      const pendingUnbookingData = Bookings.find({ status: 'Awaiting Approval for Unbooking' }).fetch();
      const pendingUnbookingDetails = pendingUnbookingData.map((booking) => {
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
      setUnbookingRequests(pendingUnbookingDetails);
    });

    return () => handle.stop();
  }, []);

  const handleApprove = (bookingId) => {
    Meteor.call('approveUnbooking', { bookingId }, (error) => {
      if (error) {
        alert('Approval failed: ' + error.reason);
      } else {
        alert('Unbooking approved successfully!');
      }
    });
  };

  const handleReject = (bookingId) => {
    Meteor.call('rejectUnbooking', { bookingId }, (error) => {
      if (error) {
        alert('Rejection failed: ' + error.reason);
      } else {
        alert('Unbooking rejected successfully!');
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 py-8 px-4 flex flex-col items-center justify-center">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Pending Unbooking Requests</h2>
        {unbookingRequests.length === 0 ? (
          <p>No pending unbooking requests.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unbookingRequests.map((request) => (
              <div
                key={request._id}
                className="bg-gray-100 p-4 rounded-lg shadow"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {request.session?.sportName}
                  </h3>
                  <span className="text-yellow-500">Pending</span>
                </div>
                <p>Coach: {request.coach?.fullName}</p>
                <p>Venue: {request.room?.name}</p>
                <p>Date: {request.session?.date}</p>
                <p>Time: {request.session?.time}</p>
                <p>User: {request.firstName} {request.lastName}</p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleApprove(request._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(request._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Reject
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
