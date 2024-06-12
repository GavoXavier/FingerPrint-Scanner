import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Coaches } from '../api/Coaches';

export default function CoachesList() {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    const handle = Tracker.autorun(() => {
      Meteor.subscribe('coaches');
      const coachData = Coaches.find().fetch();
      setCoaches(coachData);
    });

    return () => handle.stop();
  }, []);

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800">Coaches List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coaches.map((coach) => (
          <div key={coach._id} className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{coach.fullName}</h3>
            <p>Age: {coach.age}</p>
            <p>Gender: {coach.gender}</p>
            <p>Contact: {coach.contactNumber}</p>
            <p>Speciality: {coach.speciality}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
