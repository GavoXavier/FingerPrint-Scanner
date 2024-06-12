import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Sessions } from '../api/Sessions';
import { Coaches } from '../api/Coaches';
import { Rooms } from '../api/Rooms';
import SportsCard from './SportsCard';

export default function SportsCards({ date }) {
  const [sessions, setSessions] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const handle = Tracker.autorun(() => {
      Meteor.subscribe('sessions', date);
      Meteor.subscribe('coaches');
      Meteor.subscribe('rooms');
      const sessionData = Sessions.find({ date }).fetch();
      const coachData = Coaches.find().fetch();
      const roomData = Rooms.find().fetch();
      setSessions(sessionData);
      setCoaches(coachData);
      setRooms(roomData);
    });

    return () => handle.stop();
  }, [date]);

  const getCoachName = (coachId) => {
    const coach = coaches.find((c) => c._id === coachId);
    return coach ? coach.fullName : 'Unknown';
  };

  const getRoomName = (roomId) => {
    const room = rooms.find((r) => r._id === roomId);
    return room ? room.name : 'Unknown';
  };

  return (
    <div className="py-4 px-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sessions.map((sport) => (
          <SportsCard
            key={sport._id}
            sportDetails={sport}
            coachName={getCoachName(sport.coachId)}
            roomName={getRoomName(sport.roomId)}
          />
        ))}
      </div>
    </div>
  );
}
