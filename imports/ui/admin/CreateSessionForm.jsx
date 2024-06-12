import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Coaches } from '../../api/Coaches';
import { Rooms } from '../../api/Rooms';

export default function CreateSessionForm() {
  const [sportName, setSportName] = useState('');
  const [coachId, setCoachId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState('');
  const [fee, setFee] = useState('');
  const [coaches, setCoaches] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const handle = Tracker.autorun(() => {
      Meteor.subscribe('coaches');
      Meteor.subscribe('rooms');
      const coachesData = Coaches.find().fetch();
      const roomsData = Rooms.find().fetch();
      setCoaches(coachesData);
      setRooms(roomsData);
    });

    return () => handle.stop();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.call('sessions.create', {
      sportName,
      coachId,
      roomId,
      date,
      time,
      slots: parseInt(slots, 10),
      fee: parseFloat(fee)
    });
    setSportName('');
    setCoachId('');
    setRoomId('');
    setTime('');
    setDate('');
    setSlots('');
    setFee('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-4">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 rounded-lg shadow">
        <input
          type="text"
          placeholder="Sport Name"
          value={sportName}
          onChange={(e) => setSportName(e.target.value)}
          required
          className="w-full px-2 py-1 border rounded shadow-sm"
        />
        <select
          value={coachId}
          onChange={(e) => setCoachId(e.target.value)}
          required
          className="w-full px-2 py-1 border rounded shadow-sm"
        >
          <option value="">Select Coach</option>
          {coaches.map(coach => (
            <option key={coach._id} value={coach._id}>{coach.fullName} ({coach.speciality})</option>
          ))}
        </select>
        <select
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          required
          className="w-full px-2 py-1 border rounded shadow-sm"
        >
          <option value="">Select Room</option>
          {rooms.map(room => (
            <option key={room._id} value={room._id}>{room.name} (Capacity: {room.capacity})</option>
          ))}
        </select>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="w-full px-2 py-1 border rounded shadow-sm"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full px-2 py-1 border rounded shadow-sm"
        />
        <input
          type="number"
          placeholder="Slots"
          value={slots}
          onChange={(e) => setSlots(e.target.value)}
          required
          className="w-full px-2 py-1 border rounded shadow-sm"
        />
        <input
          type="number"
          step="0.01"
          placeholder="Payment Fee"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          required
          className="w-full px-2 py-1 border rounded shadow-sm"
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Session
        </button>
      </form>
    </div>
  );
}
