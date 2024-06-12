import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Rooms } from '../api/Rooms';

export default function RoomsList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const handle = Tracker.autorun(() => {
      Meteor.subscribe('rooms');
      const roomsData = Rooms.find().fetch();
      setRooms(roomsData);
    });

    return () => handle.stop();
  }, []);

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800">Rooms List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div key={room._id} className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{room.name}</h3>
            <p>Capacity: {room.capacity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
