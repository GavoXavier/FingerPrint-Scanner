// import React, { useState, useEffect } from 'react';
// import { Meteor } from 'meteor/meteor';
// import { useNavigate, useParams } from 'react-router-dom';

// export default function WalletPayment() {
//   const navigate = useNavigate();
//   const { sessionId } = useParams();
//   const [profile, setProfile] = useState({
//     walletBalance: 0,
//     firstName: '',
//     lastName: '',
//     picture: '',
//   });

//   useEffect(() => {
//     const handle = Tracker.autorun(() => {
//       const user = Meteor.user();
//       if (user && user.profile) {
//         setProfile({
//           walletBalance: user.profile.walletBalance || 0,
//           firstName: user.profile.firstName || '',
//           lastName: user.profile.lastName || '',
//           picture: user.profile.picture || '',
//         });
//       }
//     });

//     return () => handle.stop();
//   }, []);

//   const handleWalletPayment = () => {
//     Meteor.call(
//       'sessions.book',
//       {
//         sessionId,
//         userId: Meteor.userId(),
//         firstName: profile.firstName,
//         lastName: profile.lastName,
//         gender: Meteor.user().profile.gender,
//         phoneNumber: Meteor.user().profile.contactNumber,
//         paymentMethod: 'wallet',
//         confirmationCode: '',
//       },
//       (error) => {
//         if (error) {
//           alert('Booking failed: ' + error.reason);
//         } else {
//           alert('Booking successful.');
//           navigate('/bookings');
//         }
//       }
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 py-8 px-4 flex flex-col items-center justify-center">
//       <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">Wallet Payment</h2>
//         <div className="flex items-center mb-4">
//           <img src={profile.picture} alt="Profile" className="w-16 h-16 rounded-full mr-4" />
//           <div>
//             <p className="text-gray-700">
//               {profile.firstName} {profile.lastName}
//             </p>
//             <p className="text-gray-700">Wallet Balance: KES {profile.walletBalance.toFixed(2)}</p>
//           </div>
//         </div>
//         <button
//           onClick={handleWalletPayment}
//           className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

export default function WalletPayment() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    walletBalance: 0,
    picture: ''
  });
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handle = Tracker.autorun(() => {
      const user = Meteor.user();
      if (user && user.profile) {
        setProfile({
          firstName: user.profile.firstName,
          lastName: user.profile.lastName,
          walletBalance: user.profile.walletBalance || 0,
          picture: user.profile.picture
        });
      }
    });

    Meteor.call('sessions.getSession', { sessionId }, (error, result) => {
      if (!error) {
        setSession(result);
      }
      setIsLoading(false);
    });

    return () => handle.stop();
  }, [sessionId]);

  const handlePayment = () => {
    if (session && profile.walletBalance >= session.fee) {
      Meteor.call('sessions.book', {
        sessionId,
        userId: Meteor.userId(),
        firstName: profile.firstName,
        lastName: profile.lastName,
        gender: Meteor.user().profile.gender,
        phoneNumber: Meteor.user().profile.contactNumber,
        paymentMethod: 'wallet',
      }, (error) => {
        if (error) {
          alert('Booking failed: ' + error.reason);
        } else {
          alert('Booking successful.');
          navigate('/bookings');
        }
      });
    } else {
      alert('Insufficient wallet balance.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center space-x-4">
          <img src={profile.picture} alt="Profile" className="w-16 h-16 rounded-full" />
          <div>
            <h2 className="text-xl font-semibold">{profile.firstName} {profile.lastName}</h2>
            <p className="text-gray-700">Wallet Balance: KES {profile.walletBalance.toFixed(2)}</p>
          </div>
        </div>
        {session && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Session Details</h3>
            <p>Session: {session.sportName}</p>
            <p>Venue: {session.roomId}</p>
            <p>Date/Time: {session.date} {session.time}</p>
            <p>Fee: KES {session.fee}</p>
          </div>
        )}
        <button
          onClick={handlePayment}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}



