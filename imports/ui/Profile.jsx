import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import EditProfileForm from './EditProfileForm';

export default function Profile() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    preferences: '',
    picture: '',
    email: '',
    walletBalance: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const handle = Tracker.autorun(() => {
      const user = Meteor.user();
      if (user && user.profile) {
        setProfile({
          firstName: user.profile.firstName || '',
          lastName: user.profile.lastName || '',
          contactNumber: user.profile.contactNumber || '',
          preferences: user.profile.preferences || '',
          picture: user.profile.picture || '',
          email: user.emails?.[0]?.address || '',
          walletBalance: user.profile.walletBalance || 0,
        });
      }
    });

    return () => handle.stop();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 py-8 px-4 flex flex-col items-center justify-center">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">User Profile</h2>
        <div className="flex items-center mb-4">
          <img
            className="object-cover h-20 w-20 rounded-full"
            src={profile.picture || 'https://via.placeholder.com/150'}
            alt="Profile"
          />
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{profile.firstName} {profile.lastName}</h3>
            <p className="text-gray-500">{profile.email}</p>
            <p className="text-gray-500">Wallet Balance: KES {profile.walletBalance.toFixed(2)}</p>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <p className="text-gray-700">{profile.firstName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <p className="text-gray-700">{profile.lastName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Contact Number</label>
          <p className="text-gray-700">{profile.contactNumber}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Preferences</label>
          <p className="text-gray-700">{profile.preferences}</p>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit Profile
        </button>
        {isEditing && (
          <EditProfileForm
            profile={profile}
            onClose={() => setIsEditing(false)}
          />
        )}
      </div>
    </div>
  );
}
