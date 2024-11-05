import React, { useState } from 'react';
import Button from '../components/button';
import Input from '../components/input';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

const Register = () => {
  const [username, setUsername] = useState(''); // Add username state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
      } else {
        const data = await response.json();
        console.log('Registration successful', data);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white dark:bg-gray-900 flex items-center justify-center min-h-screen">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
              <div className="flex justify-center mx-auto">
                  <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>
              </div>
              
              <div className="flex items-center justify-center mt-6">
                  <p className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
                      Register
                  </p>
              </div>

              <div className="relative flex justify-center mt-8">
                <Input inputPlaceholder="Username"
                inputType="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="relative flex justify-center mt-6">
                <Input inputPlaceholder="Email address"
                inputType="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
              </div>

              <div className="relative flex justify-center mt-4">
                <Input inputPlaceholder="Password"
                inputType="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
              </div>

              <div className="relative flex justify-center mt-4">
                <Input inputPlaceholder="Confirm Password"
                inputType="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}/>
              </div>

              {error && <p>{error}</p>}

              <div className="relative flex justify-center mt-6">
                <Button buttonText="Sign Up" type="submit"/>
              </div>
              <div className="mt-6 text-center ">
                      <a href="http://localhost:5173/api/users/login/" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                          Already have an account?
                      </a>
                  </div>
          </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;