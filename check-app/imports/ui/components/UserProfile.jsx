
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Employees } from '../../api/employees';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

export default function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [status, setStatus] = useState('');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const handle = Meteor.subscribe('employees');
    const computation = Tracker.autorun(() => {
      if (handle.ready()) {
        const foundEmployee = Employees.findOne({ userId });
        setEmployee(foundEmployee);
      }
    });

    return () => computation.stop();
  }, [userId]);

  useEffect(() => {
    if (employee) {
      Meteor.call('checkLogs.getStatus', employee._id, (error, result) => {
        if (!error) {
          setStatus(result);
        }
      });
    }
  }, [employee]);

  const handleCheckInOut = () => {
    Meteor.call('checkLogs.insert', employee._id, (error, result) => {
      if (!error) {
        setStatus(result);
        setTimestamp(new Date().toLocaleString());

        setTimeout(() => {
          Meteor.logout(() => {
            navigate('/');
          });
        }, 15000);
      } else {
        alert('Error: ' + error.reason);
      }
    });
  };

  if (!employee) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">User not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="p-4 border rounded-md shadow-md">
        <h3 className="text-xl font-bold">{employee.fullName}</h3>
        <p>Role: {employee.role}</p>
        <p>Age: {employee.age}</p>
        <p>Contact: {employee.contact}</p>
        <p>Email: {employee.email}</p>
        <div className="mt-4">
          <span className={`px-4 py-2 ${status === 'Checked in' ? 'bg-green-500' : 'bg-red-500'} text-white rounded-md`}>
            {status}
          </span>
          <p>{status} at {timestamp}</p>
          <button
            onClick={handleCheckInOut}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {status === 'Checked in' ? 'Check Out' : 'Check In'}
          </button>
        </div>
      </div>
    </div>
  );
}

