// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Employees } from '../../api/employees';
// import { Tracker } from 'meteor/tracker';
// import { Meteor } from 'meteor/meteor';

// export default function UserProfile() {
//   const { fingerprintId } = useParams();
//   const [employee, setEmployee] = useState(null);
//   const [status, setStatus] = useState('');
//   const [timestamp, setTimestamp] = useState('');

//   useEffect(() => {
//     const handle = Meteor.subscribe('employees');
//     const computation = Tracker.autorun(() => {
//       if (handle.ready()) {
//         const foundEmployee = Employees.findOne({ fingerprintId });
//         setEmployee(foundEmployee);
//       }
//     });

//     return () => computation.stop();
//   }, [fingerprintId]);

//   useEffect(() => {
//     if (employee) {
//       Meteor.call('checkLogs.insert', fingerprintId, (error, result) => {
//         if (!error) {
//           setStatus(result);
//           setTimestamp(new Date().toLocaleString());
//         }
//       });
//     }
//   }, [employee, fingerprintId]);

//   useEffect(() => {
//     if (employee) {
//       Meteor.call('checkLogs.getStatus', fingerprintId, (error, result) => {
//         if (!error) {
//           setStatus(result);
//         }
//       });
//     }
//   }, [employee, fingerprintId]);

//   if (!employee) {
//     return (
//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold">Fingerprint ID not found</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="p-4 border rounded-md shadow-md">
//         {employee.profilePicture && (
//           <img
//             src={employee.profilePicture}
//             alt="Profile"
//             className="w-full h-48 object-cover rounded-md mb-4"
//           />
//         )}
//         <h3 className="text-xl font-bold">{employee.fullName}</h3>
//         <p>Role: {employee.role}</p>
//         <p>Age: {employee.age}</p>
//         <p>Contact: {employee.contact}</p>
//         <p>Fingerprint ID: {employee.fingerprintId}</p>
//         <div className="mt-4">
//           <span className={`px-4 py-2 ${status === 'Checked in' ? 'bg-green-500' : 'bg-red-500'} text-white rounded-md`}>
//             {status}
//           </span>
//           <p>{status} at {timestamp}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Employees } from '../../api/employees';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

export default function UserProfile() {
  const { fingerprintId } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [status, setStatus] = useState('');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const handle = Meteor.subscribe('employees');
    const computation = Tracker.autorun(() => {
      if (handle.ready()) {
        const foundEmployee = Employees.findOne({ fingerprintId });
        setEmployee(foundEmployee);
      }
    });

    return () => computation.stop();
  }, [fingerprintId]);

  useEffect(() => {
    if (employee) {
      Meteor.call('checkLogs.insert', fingerprintId, (error, result) => {
        if (!error) {
          setStatus(result);
          setTimestamp(new Date().toLocaleString());
        }
      });

      // Set a timeout to navigate back to the homepage after 10 seconds
      const timer = setTimeout(() => {
        navigate('/');
      }, 10000);

      // Clean up the timeout when the component unmounts or when the employee changes
      return () => clearTimeout(timer);
    }
  }, [employee, fingerprintId, navigate]);

  useEffect(() => {
    if (employee) {
      Meteor.call('checkLogs.getStatus', fingerprintId, (error, result) => {
        if (!error) {
          setStatus(result);
        }
      });
    }
  }, [employee, fingerprintId]);

  if (!employee) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Fingerprint ID not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="p-4 border rounded-md shadow-md">
        {employee.profilePicture && (
          <img
            src={employee.profilePicture}
            alt="Profile"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        )}
        <h3 className="text-xl font-bold">{employee.fullName}</h3>
        <p>Role: {employee.role}</p>
        <p>Age: {employee.age}</p>
        <p>Contact: {employee.contact}</p>
        <p>Fingerprint ID: {employee.fingerprintId}</p>
        <div className="mt-4">
          <span className={`px-4 py-2 ${status === 'Checked in' ? 'bg-green-500' : 'bg-red-500'} text-white rounded-md`}>
            {status}
          </span>
          <p>{status} at {timestamp}</p>
        </div>
      </div>
    </div>
  );
}
