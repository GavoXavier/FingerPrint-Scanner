// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Meteor } from 'meteor/meteor';

// export default function BookSessionForm() {
//   const { sessionId } = useParams();
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [gender, setGender] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const bookingData = {
//       sessionId,
//       username: Meteor.user().username,
//       firstName,
//       lastName,
//       gender,
//       phoneNumber,
//     };

//     Meteor.call('sessions.book', bookingData, (error) => {
//       if (error) {
//         alert('Booking failed: ' + error.reason);
//       } else {
//         alert('Booking successful!');
//       }
//     });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
//       <h1 className="text-2xl font-bold text-center text-white mb-4">Book Session</h1>
//       <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-lg">
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="First Name"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//             className="px-2 py-1 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Last Name"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//             className="px-2 py-1 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <select
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//             required
//             className="px-2 py-1 border rounded w-full"
//           >
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <input
//             type="tel"
//             placeholder="Phone Number"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             required
//             className="px-2 py-1 border rounded w-full"
//           />
//         </div>
//         <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Book Now
//         </button>
//       </form>
//     </div>
//   );
// }
