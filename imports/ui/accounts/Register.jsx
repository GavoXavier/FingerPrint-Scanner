import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (upload) => {
      Accounts.createUser({
        username,
        password,
        email,
        profile: {
          firstName,
          lastName,
          contactNumber,
          age,
          gender,
          picture: upload.target.result,
        },
      }, (error) => {
        if (error) {
          alert(error.reason);
        } else {
          console.log('User registered successfully!');
          navigate('/');  // Redirect to the login page after registration
        }
      });
    };
    reader.readAsDataURL(profilePicture);
  };

  return (
    <div className="w-full  overflow-scroll block  bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4   items-center justify-center">
      <div className="bg-white py-6 px-10 sm:max-w-md w-full">
        <div className="sm:text-3xl text-2xl font-semibold text-center text-sky-600 mb-12">
          Registration Form
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="my-8">
            <input
              type="email"
              className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <input
              type="text"
              className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <input
              type="text"
              className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <input
              type="text"
              className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <input
              type="number"
              className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <select
              className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-8">
            <input
              type="password"
              className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <input
              type="password"
              className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <input
              type="file"
              onChange={handleFileChange}
              className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
              required
            />
          </div>
          <div className="flex justify-center my-6">
            <button
              type="submit"
              className="rounded-full p-3 w-full sm:w-56 bg-gradient-to-r from-sky-600 to-teal-300 text-white text-lg font-semibold"
            >
              Create Account
            </button>
          </div>
          <div className="flex justify-center">
            <p className="text-gray-500">Already have an account?</p>
            <a href="/" className="text-sky-600 pl-2">Sign In</a>
          </div>
        </form>
      </div>
    </div>
  );
}
