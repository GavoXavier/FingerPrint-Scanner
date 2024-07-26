import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileModal = ({ onClose }) => {
  const user = Meteor.user();
  const [email, setEmail] = useState(user?.emails[0]?.address || '');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    if (password) {
      Accounts.changePassword(password, (err) => {
        if (err) {
          toast.error('Error changing password: ' + err.message);
        } else {
          toast.success('Password changed successfully!');
          onClose();
        }
      });
    } else {
      toast.info('No changes made.');
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl mb-4 text-gray-800 dark:text-white">Edit Profile</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg dark:bg-gray-600">
              Cancel
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Save
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProfileModal;
