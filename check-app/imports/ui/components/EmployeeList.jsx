// import React from 'react';
// import { Meteor } from 'meteor/meteor';

// export default function EmployeeList({ employees, checkLogs }) {
//   const handleRemove = (employeeId) => {
//     if (window.confirm(`Are you sure you want to remove ${employees.find(e => e._id === employeeId).fullName} from the system?`)) {
//       Meteor.call('employees.remove', employeeId, (error) => {
//         if (error) {
//           alert('Error removing employee: ' + error.reason);
//         }
//       });
//     }
//   };

//   const getStatus = (employeeId) => {
//     const latestLog = checkLogs.find(log => log.employeeId === employeeId);
//     return latestLog ? latestLog.status : 'No Status';
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {employees.map((employee) => (
//         <div key={employee._id} className="relative p-6 border rounded-lg shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300 overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 opacity-60 blur-lg"></div>
//           <div className="relative flex items-center space-x-4">
//             <img
//               src="/user.webp"
//               alt="Profile"
//               className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-800"
//             />
//             <div>
//               <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{employee.fullName}</h3>
//               <p className="text-gray-600 dark:text-gray-400">Role: {employee.role}</p>
//               <p className="text-gray-600 dark:text-gray-400">Age: {employee.age}</p>
//               <p className="text-gray-600 dark:text-gray-400">Contact: {employee.contact}</p>
//               <p className={`text-gray-600 dark:text-gray-400 mt-2`}>
//                 Status: 
//                 <span className={`ml-2 px-2 py-1 rounded-md text-white ${getStatus(employee._id) === 'Checked in' ? 'bg-green-500' : 'bg-red-500'}`}>
//                   {getStatus(employee._id)}
//                 </span>
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={() => handleRemove(employee._id)}
//             className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
//           >
//             Remove
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

import React from 'react';
import { Meteor } from 'meteor/meteor';

export default function EmployeeList({ employees, checkLogs }) {
  const handleRemove = (employeeId, fullName) => {
    const confirmed = window.confirm(`Are you sure you want to remove ${fullName} from the system?`);
    if (confirmed) {
      Meteor.call('employees.remove', employeeId, (error) => {
        if (error) {
          toast.error('Error removing employee: ' + error.reason);
        } else {
          toast.success(`${fullName} has been removed from the system.`);
        }
      });
    }
  };

  const getAvatarUrl = (seed) => {
    return `https://avatars.dicebear.com/api/initials/${seed}.svg`;
  };

  const getStatus = (employeeId) => {
    const latestLog = checkLogs.find(log => log.employeeId === employeeId);
    return latestLog ? latestLog.status : 'No Status';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {employees.map((employee) => (
        <div key={employee._id} className="relative p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-20 blur-md"></div>
          <div className="relative flex items-center space-x-4">
            <img
              src={getAvatarUrl(employee.fullName)}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-gray-300"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{employee.fullName}</h3>
              <p className="text-gray-600 dark:text-gray-400">Role: {employee.role}</p>
              <p className="text-gray-600 dark:text-gray-400">Age: {employee.age}</p>
              <p className="text-gray-600 dark:text-gray-400">Contact: {employee.contact}</p>
              <p className={`text-gray-600 dark:text-gray-400 mt-2`}>
                Status: 
                <span className={`ml-2 px-2 py-1 rounded-md text-white ${getStatus(employee._id) === 'Checked in' ? 'bg-green-500' : 'bg-red-500'}`}>
                  {getStatus(employee._id)}
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={() => handleRemove(employee._id, employee.fullName)}
            className="relative mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
