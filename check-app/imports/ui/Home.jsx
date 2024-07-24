// imports/ui/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const setRandomBackgroundImage = () => {
      const randomImage = `https://source.unsplash.com/random/1920x1080/?wildlife`;
      document.body.style.backgroundImage = `url(${randomImage})`;
    };

    setRandomBackgroundImage();
  }, []);

  const handleLogin = () => {
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        alert('Login failed: ' + error.reason);
      } else {
        if (email === 'admin@example.com') {
          navigate('/admin');
        } else {
          alert('Invalid admin credentials');
        }
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover" style={{ backgroundImage: 'url(/images.jpg)' }}>
      <div className="w-full max-w-sm p-8 space-y-8 bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg">
        <h1 className="text-2xl font-bold text-center text-white mb-6">Employee Check-In System</h1>
        <div className="relative mb-4">
          <input
            type="email"
            name="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
            placeholder=" "
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="floating_email"
            className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
          />
          <label
            htmlFor="floating_password"
            className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <button
  onClick={handleLogin}
  className="w-full py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 relative overflow-hidden"
>
  <span className="relative z-10">Login as Admin</span>
  <div className="absolute inset-0 bg-orange-500 transition-all duration-500 transform -translate-x-full hover:translate-x-0 z-0"></div>
</button>
      </div>
    </div>
  );
}
