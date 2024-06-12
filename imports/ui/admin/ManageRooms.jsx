import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Rooms } from '../../api/Rooms';

export default function ManageRooms() {
  const [rooms, setRooms] = useState([]);
  const [formValues, setFormValues] = useState({
    name: '',
    capacity: '',
  });

  useEffect(() => {
    const handle = Tracker.autorun(() => {
      Meteor.subscribe('rooms');
      const roomsData = Rooms.find().fetch();
      setRooms(roomsData);
    });

    return () => handle.stop();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.call('rooms.create', formValues, (error) => {
      if (error) {
        alert('Error adding room: ' + error.reason);
      } else {
        setFormValues({
          name: '',
          capacity: '',
        });
      }
    });
  };

  const handleDelete = (roomId) => {
    Meteor.call('rooms.delete', { roomId });
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Manage Rooms</h2>
      <form onSubmit={handleSubmit} className="mb-4 space-y-4">
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          placeholder="Room Name"
          className="w-full px-2 py-1 border rounded shadow-sm"
          required
        />
        <input
          type="number"
          name="capacity"
          value={formValues.capacity}
          onChange={handleChange}
          placeholder="Maximum Capacity"
          className="w-full px-2 py-1 border rounded shadow-sm"
          required
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Room
        </button>
      </form>
      <ul className="list-disc pl-5 mt-2">
        {rooms.map((room) => (
          <li key={room._id} className="mt-1 p-4 bg-gray-100 rounded-lg shadow flex justify-between">
            <span>{room.name} (Capacity: {room.capacity})</span>
            <button
              onClick={() => handleDelete(room._id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
