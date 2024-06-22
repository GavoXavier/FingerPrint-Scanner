import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

export default function Wallet() {
  const [profile, setProfile] = useState({
    walletBalance: 0,
  });
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  useEffect(() => {
    const handle = Tracker.autorun(() => {
      const user = Meteor.user();
      if (user && user.profile) {
        setProfile({
          walletBalance: user.profile.walletBalance || 0,
        });
      }
    });

    return () => handle.stop();
  }, []);

  const handleDeposit = (amount) => {
    setDepositAmount(depositAmount + amount);
  };

  const handleWithdraw = (amount) => {
    setWithdrawAmount(withdrawAmount + amount);
  };

  const submitDeposit = () => {
    Meteor.call('wallet.deposit', depositAmount, (error) => {
      if (error) {
        alert('Deposit failed: ' + error.reason);
      } else {
        setDepositAmount(0);
      }
    });
  };

  const submitWithdraw = () => {
    Meteor.call('wallet.withdraw', withdrawAmount, (error) => {
      if (error) {
        alert('Withdraw failed: ' + error.reason);
      } else {
        setWithdrawAmount(0);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 py-8 px-4 flex flex-col items-center justify-center">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Wallet</h2>
        <p className="text-gray-700 mb-4">Wallet Balance: KES {profile.walletBalance.toFixed(2)}</p>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Deposit</h3>
          <div className="flex space-x-2 mb-2">
            {[100, 200, 500, 1000].map(amount => (
              <button key={amount} onClick={() => handleDeposit(amount)} className="bg-blue-500 text-white px-4 py-2 rounded">
                +{amount}
              </button>
            ))}
          </div>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded shadow mb-2"
          />
          <div className="flex space-x-2">
            <button onClick={submitDeposit} className="w-full bg-green-500 text-white px-4 py-2 rounded">Deposit</button>
            <button onClick={() => setDepositAmount(0)} className="w-full bg-red-500 text-white px-4 py-2 rounded">Clear</button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Withdraw</h3>
          <div className="flex space-x-2 mb-2">
            {[100, 200, 500, 1000].map(amount => (
              <button key={amount} onClick={() => handleWithdraw(amount)} className="bg-blue-500 text-white px-4 py-2 rounded">
                +{amount}
              </button>
            ))}
          </div>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded shadow mb-2"
          />
          <div className="flex space-x-2">
            <button onClick={submitWithdraw} className="w-full bg-green-500 text-white px-4 py-2 rounded">Withdraw</button>
            <button onClick={() => setWithdrawAmount(0)} className="w-full bg-red-500 text-white px-4 py-2 rounded">Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}
