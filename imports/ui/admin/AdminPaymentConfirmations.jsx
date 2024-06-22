// import React, { useState, useEffect } from 'react';
// import { Meteor } from 'meteor/meteor';
// import { useTracker } from 'meteor/react-meteor-data';
// import { Bookings } from '/imports/api/Bookings';
// import { Sessions } from '/imports/api/Sessions';
// // import { Users } from '../../imports/api/Users';

// export default function AdminPaymentConfirmations() {
//   const [loading, setLoading] = useState(true);
//   const payments = useTracker(() => {
//     const handle = Meteor.subscribe('adminPayments');
//     if (!handle.ready()) {
//       setLoading(true);
//       return [];
//     }
//     setLoading(false);
//     return Bookings.find({ status: 'Awaiting Confirmation' }).fetch();
//   }, []);

//   const handleApprove = (bookingId) => {
//     Meteor.call('approvePayment', { bookingId }, (error) => {
//       if (error) {
//         alert('Approval failed: ' + error.reason);
//       } else {
//         alert('Payment approved successfully');
//       }
//     });
//   };

//   const handleReject = (bookingId) => {
//     Meteor.call('rejectPayment', { bookingId }, (error) => {
//       if (error) {
//         alert('Rejection failed: ' + error.reason);
//       } else {
//         alert('Payment rejected successfully');
//       }
//     });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Payment Confirmations</h2>
//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Full Name</th>
//             <th className="border px-4 py-2">Username</th>
//             <th className="border px-4 py-2">Session</th>
//             <th className="border px-4 py-2">Venue</th>
//             <th className="border px-4 py-2">Date/Time</th>
//             <th className="border px-4 py-2">Payment Fee</th>
//             <th className="border px-4 py-2">Mpesa Code</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {payments.map((payment) => {
//             const user = Meteor.users.findOne(payment.userId);
//             const session = Sessions.findOne(payment.sessionId);
//             return (
//               <tr key={payment._id}>
//                 <td className="border px-4 py-2">{user?.profile.firstName} {user?.profile.lastName}</td>
//                 <td className="border px-4 py-2">{user?.username}</td>
//                 <td className="border px-4 py-2">{session?.sportName}</td>
//                 <td className="border px-4 py-2">{session?.roomId}</td>
//                 <td className="border px-4 py-2">{session?.date} / {session?.time}</td>
//                 <td className="border px-4 py-2">{session?.fee}</td>
//                 <td className="border px-4 py-2">{payment.confirmationCode}</td>
//                 <td className="border px-4 py-2">
//                   <button
//                     onClick={() => handleApprove(payment._id)}
//                     className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => handleReject(payment._id)}
//                     className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

export default function AdminPaymentConfirmations() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const handle = Tracker.autorun(() => {
      Meteor.call('bookings.getPending', (error, result) => {
        if (!error) {
          const bookingsWithUserData = result.map(booking => {
            const user = Meteor.users.findOne({ _id: booking.userId });
            return {
              ...booking,
              user
            };
          });
          setBookings(bookingsWithUserData);
        }
      });
    });

    return () => handle.stop();
  }, []);

  const handleApprove = (bookingId) => {
    Meteor.call('approvePayment', { bookingId }, (error) => {
      if (error) {
        alert('Approval failed: ' + error.reason);
      }
    });
  };

  const handleReject = (bookingId) => {
    Meteor.call('rejectPayment', { bookingId }, (error) => {
      if (error) {
        alert('Rejection failed: ' + error.reason);
      }
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Confirmations</h1>
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="border py-2 px-4">Full Name</th>
            <th className="border py-2 px-4">Username</th>
            <th className="border py-2 px-4">Session</th>
            <th className="border py-2 px-4">Venue</th>
            <th className="border py-2 px-4">Date/Time</th>
            <th className="border py-2 px-4">Payment Fee</th>
            <th className="border py-2 px-4">Mpesa Code</th>
            <th className="border py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking._id}>
              <td className="border py-2 px-4">{booking.user.profile.firstName} {booking.user.profile.lastName}</td>
              <td className="border py-2 px-4">{booking.user.username}</td>
              <td className="border py-2 px-4">{booking.sessionId.sportName}</td>
              <td className="border py-2 px-4">{booking.sessionId.roomId}</td>
              <td className="border py-2 px-4">{booking.sessionId.date} {booking.sessionId.time}</td>
              <td className="border py-2 px-4">{booking.sessionId.fee}</td>
              <td className="border py-2 px-4">{booking.confirmationCode}</td>
              <td className="border py-2 px-4">
                <button onClick={() => handleApprove(booking._id)} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700">Approve</button>
                <button onClick={() => handleReject(booking._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 ml-2">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


