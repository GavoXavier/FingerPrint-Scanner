import React, { useState } from 'react';

export default function DepositWithdraw() {
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const handleDeposit = (amount) => {
    setDepositAmount(depositAmount + amount);
  };

  const handleWithdraw = (amount) => {
    setWithdrawAmount(withdrawAmount + amount);
  };

  const handleDepositSubmit = () => {
    Meteor.call('wallet.deposit', depositAmount, (error) => {
      if (error) {
        alert('Deposit failed: ' + error.reason);
      } else {
        alert('Deposit successful');
        setDepositAmount(0);
      }
    });
  };

  const handleWithdrawSubmit = () => {
    Meteor.call('wallet.withdraw', withdrawAmount, (error) => {
      if (error) {
        alert('Withdraw failed: ' + error.reason);
      } else {
        alert('Withdraw successful');
        setWithdrawAmount(0);
      }
    });
  };

  const handleClearDeposit = () => {
    setDepositAmount(0);
  };

  const handleClearWithdraw = () => {
    setWithdrawAmount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 py-8 px-4 flex flex-col items-center justify-center">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Deposit Funds</h2>
        <div className="mb-4">
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(parseFloat(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter amount"
          />
        </div>
        <div className="flex space-x-2 mb-4">
          {[100, 200, 500, 1000].map((amount) => (
            <button
              key={amount}
              onClick={() => handleDeposit(amount)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {amount}
            </button>
          ))}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleDepositSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Deposit
          </button>
          <button
            onClick={handleClearDeposit}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 w-full max-w-md mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Withdraw Funds</h2>
        <div className="mb-4">
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(parseFloat(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter amount"
          />
        </div>
        <div className="flex space-x-2 mb-4">
          {[100, 200, 500, 1000].map((amount) => (
            <button
              key={amount}
              onClick={() => handleWithdraw(amount)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {amount}
            </button>
          ))}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleWithdrawSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Withdraw
          </button>
          <button
            onClick={handleClearWithdraw}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
