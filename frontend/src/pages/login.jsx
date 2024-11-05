import React, { useState } from 'react';
import Button from '../components/button';
import Input from '../components/input';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get('Content-Type');
      const responseText = await response.text(); // Get the response text

      if (!response.ok) {
        if (contentType && contentType.includes('application/json')) {
          const errorData = JSON.parse(responseText);
          throw new Error(errorData.message || 'Login failed');
        } else {
          console.error('Unexpected response format:', responseText); // Log the response text
          throw new Error('Unexpected response format');
        }
      }

      if (contentType && contentType.includes('application/json')) {
        const data = JSON.parse(responseText);
        console.log('Login successful:', data);
      } else {
        console.error('Unexpected response format:', responseText); // Log the response text
        throw new Error('Unexpected response format');
      }

    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen w-full bg-white dark:bg-gray-800">
        <div className="w-full max-w-md px-6 py-4">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="src/assets/logo_transparent.png"
              alt="Logo"
            />
          </div>
          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Welcome Back
          </h3>
          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            Login or create account
          </p>
          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="w-full mt-4">
              <Input
                inputPlaceholder="Email Address"
                inputType="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full mt-4">
              <Input
                inputPlaceholder="Password"
                inputType="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <Button buttonText="Sign In" />
            </div>
          </form>
          <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700 mt-6">
            <span className="text-sm text-gray-600 dark:text-gray-200">
              Don't have an account?{' '}
            </span>
            <a
              href="http://localhost:5173/api/users/register/"
              className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
            >
              Register
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
