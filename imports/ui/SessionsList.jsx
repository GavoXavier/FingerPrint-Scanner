import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Sessions } from '../api/Sessions';

export default function SessionsList() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const handle = Tracker.autorun(() => {
      Meteor.subscribe('sessions');
      const sessionData = Sessions.find().fetch();
      setSessions(sessionData);
    });

    return () => handle.stop();
  }, []);

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800">Sessions List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sessions.map((session) => (
          <div key={session._id} className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{session.sportName}</h3>
            <p>Coach: {session.coachId}</p>
            <p>Room: {session.roomId}</p>
            <p>Time: {session.time}</p>
            <p>Date: {session.date}</p>
            <p>Slots: {session.slots}</p>
            <p>Payment Fee: Ksh {session.fee}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
