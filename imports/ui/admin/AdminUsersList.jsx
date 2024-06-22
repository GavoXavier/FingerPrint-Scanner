import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

export default function AdminUsersList() {
  const [loading, setLoading] = useState(true);
  
  const users = useTracker(() => {
    const handle = Meteor.subscribe('allUsers');
    if (!handle.ready()) {
      setLoading(true);
      return [];
    }
    setLoading(false);
    return Meteor.users.find().fetch();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <h2 className="text-2xl font-bold mb-4">Admin Users List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Roles</th>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Wallet Balance</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.emails ? user.emails[0].address : 'No Email'}</td>
              <td className="py-2 px-4 border-b">{user.roles ? user.roles.join(', ') : 'No Roles'}</td>
              <td className="py-2 px-4 border-b">{user.profile && user.profile.firstName ? user.profile.firstName : 'N/A'}</td>
              <td className="py-2 px-4 border-b">{user.profile && user.profile.lastName ? user.profile.lastName : 'N/A'}</td>
              <td className="py-2 px-4 border-b">{user.profile && user.profile.walletBalance ? `Ksh.${user.profile.walletBalance.toFixed(2)}` : '0.00'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
