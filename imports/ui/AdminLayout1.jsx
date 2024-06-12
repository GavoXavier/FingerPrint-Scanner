// import React from 'react';
// import { Outlet, Link, useNavigate } from 'react-router-dom';

// export default function AdminLayout() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     Meteor.logout((error) => {
//       if (error) {
//         alert('Logout failed: ' + error.reason);
//       } else {
//         navigate('/');
//       }
//     });
//   };

//   return (
//     <div className="flex h-screen">
//       <div className="flex flex-col justify-between border-e bg-white w-1/4">
//         <div className="px-4 py-6">
//           <div className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600 mb-6">
//             <img src="/ben-sweet-2LowviVHZ-E-unsplash.jpg" alt="Logo" />
//           </div>
//           <ul className="space-y-1">
//             <li>
//               <Link
//                 to="create-session"
//                 className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
//               >
//                 Create Session
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="session-list"
//                 className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
//               >
//                 Sessions List
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="user-list"
//                 className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
//               >
//                 Users List
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="booking-statistics"
//                 className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
//               >
//                 Booking Statistics
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="create-coach"
//                 className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
//               >
//                 Create Coach
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="coach-list"
//                 className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
//               >
//                 Coaches List
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="manage-rooms"
//                 className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
//               >
//                 Manage Rooms
//               </Link>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 onClick={handleLogout}
//                 className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
//               >
//                 Logout
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className="flex-grow p-6 bg-gray-100 overflow-y-auto">
//         <Outlet />
//       </div>
//     </div>
//   );
// }
