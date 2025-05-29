'use client';

import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, googleProvider } from '../firebase/config';
import { signInWithPopup } from 'firebase/auth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log('User created:', res.user);
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Email signup error:', err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google sign-in success:', result.user);
    } catch (err) {
      console.error('Google signup error:', err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Create an Account</h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 shadow-md"
          >
            Sign Up with Email
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 shadow-md"
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
              fill="currentColor"
            >
              <path d="M488 261.8c0-17.8-1.6-35.3-4.8-52H249v98.6h134.3c-5.8 31.3-23.4 57.7-50 75.5v62h80.8c47.2-43.5 74.4-107.6 74.4-184.1z" />
              <path d="M249 480c67 0 123.2-22.1 164.3-60.1l-80.8-62c-22.4 15-51.1 24-83.5 24-64 0-118.1-43.2-137.6-101.4H27.4v63.6C68.1 428.3 153.5 480 249 480z" />
              <path d="M111.4 289.5c-4.8-14.3-7.6-29.5-7.6-45s2.8-30.7 7.6-45V136H27.4C9.9 171.6 0 209.5 0 249s9.9 77.4 27.4 113h83.9v-72.5z" />
              <path d="M249 97.7c35.8 0 68 12.3 93.5 36.3l70.2-70.2C372.2 27.3 316 0 249 0 153.5 0 68.1 51.7 27.4 136l83.9 63.6C130.9 140.9 185 97.7 249 97.7z" />
            </svg>
            Sign Up with Google
          </button>
        </div>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account? <a href="#" className="text-purple-400 hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
