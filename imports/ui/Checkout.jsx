import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleProceed = () => {
    if (paymentMethod === 'paybill') {
      navigate(`/paybill/${sessionId}`);
    } else if (paymentMethod === 'wallet') {
      navigate(`/wallet-payment /${sessionId}`); 
    } else {
      alert('Please select a payment method.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
        <div className="flex flex-col space-y-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="paybill"
              onChange={() => handlePaymentMethodChange('paybill')}
              className="mr-2"
            />
            Pay with Paybill
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="wallet"
              onChange={() => handlePaymentMethodChange('wallet')}
              className="mr-2"
            />
            Pay with Wallet
          </label>
        </div>
        <button
          onClick={handleProceed}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
