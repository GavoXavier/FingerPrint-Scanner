import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Sessions } from '../../api/Sessions';
import { Coaches } from '../../api/Coaches';
import { Rooms } from '../../api/Rooms';

export default function AdminSessionsList() {
  const [sessions, setSessions] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [editingSession, setEditingSession] = useState(null);
  const [formValues, setFormValues] = useState({
    sportName: '',
    coachId: '',
    roomId: '',
    time: '',
    date: '',
    slots: '',
    fee: '',
  });

  useEffect(() => {
    const handle = Tracker.autorun(() => {
      Meteor.subscribe('sessions');
      Meteor.subscribe('coaches');
      Meteor.subscribe('rooms');
      const sessionData = Sessions.find().fetch();
      const coachData = Coaches.find().fetch();
      const roomData = Rooms.find().fetch();
      setSessions(sessionData);
      setCoaches(coachData);
      setRooms(roomData);
    });

    return () => handle.stop();
  }, []);

  const handleEdit = (session) => {
    setEditingSession(session);
    setFormValues({
      sportName: session.sportName,
      coachId: session.coachId,
      roomId: session.roomId,
      time: session.time,
      date: session.date,
      slots: session.slots,
      fee: session.fee,
    });
  };

  const handleDelete = (sessionId) => {
    Meteor.call('sessions.delete', { sessionId });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.call('sessions.edit', { sessionId: editingSession._id, updates: formValues }, (error) => {
      if (error) {
        alert('Edit failed: ' + error.reason);
      } else {
        setEditingSession(null);
      }
    });
  };

  const getCoachName = (coachId) => {
    const coach = coaches.find((c) => c._id === coachId);
    return coach ? coach.fullName : 'Unknown';
  };

  const getRoomName = (roomId) => {
    const room = rooms.find((r) => r._id === roomId);
    return room ? room.name : 'Unknown';
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800">Sessions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sessions.map((session) => (
          <div key={session._id} className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{session.sportName}</h3>
            <p>Coach: {getCoachName(session.coachId)}</p>
            <p>Room: {getRoomName(session.roomId)}</p>
            <p>Time: {session.time}</p>
            <p>Date: {session.date}</p>
            <p>Slots: {session.slots}</p>
            <p>Payment Fee: Ksh {session.fee}</p>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleEdit(session)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(session._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingSession && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Session</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Sport Name</label>
                <input
                  type="text"
                  name="sportName"
                  value={formValues.sportName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Coach</label>
                <select
                  name="coachId"
                  value={formValues.coachId}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                >
                  <option value="">Select Coach</option>
                  {coaches.map((coach) => (
                    <option key={coach._id} value={coach._id}>
                      {coach.fullName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Room</label>
                <select
                  name="roomId"
                  value={formValues.roomId}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                >
                  <option value="">Select Room</option>
                  {rooms.map((room) => (
                    <option key={room._id} value={room._id}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formValues.time}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formValues.date}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Slots</label>
                <input
                  type="number"
                  name="slots"
                  value={formValues.slots}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Payment Fee</label>
                <input
                  type="number"
                  step="0.01"
                  name="fee"
                  value={formValues.fee}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingSession(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
