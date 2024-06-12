import React, { useState, useEffect } from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

export default function AdminWalletBalance() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const handle = Tracker.autorun(() => {
      const admin = Meteor.users.findOne({ username: 'Admin' });
      if (admin && admin.profile && admin.profile.walletBalance !== undefined) {
        setBalance(admin.profile.walletBalance);
      }
    });

    return () => handle.stop();
  }, []);

  return (
    <div className="px-4 py-6 bg-gray-200 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-800">Admin Wallet Balance</h2>
      <p className="text-gray-700">KES {balance.toFixed(2)}</p>
    </div>
  );
}
