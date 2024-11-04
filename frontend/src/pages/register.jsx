import React from 'react';
import Button from '../components/button';
import Input from '../components/input';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

const Register = () => {
  return (
    <>
      <Navbar />
      <div className="bg-white dark:bg-gray-900 flex items-center justify-center min-h-screen">
          <form className="w-full max-w-md">
              <div className="flex justify-center mx-auto">
                  <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>
              </div>
              
              <div className="flex items-center justify-center mt-6">
                  <p className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
                      Register
                  </p>
              </div>

              <div className="relative flex justify-center mt-8">
                <Input inputPlaceholder="Username"/>
              </div>

              <div className="relative flex justify-center mt-6">
                <Input inputPlaceholder="Email address"/>
              </div>

              <div className="relative flex justify-center mt-4">
                <Input inputPlaceholder="Password"/>
              </div>

              <div className="relative flex justify-center mt-4">
                <Input inputPlaceholder="Confirm Password"/>
              </div>

              <div className="relative flex justify-center mt-6">
                <Button buttonText="Sign Up"/>
              </div>
              <div className="mt-6 text-center ">
                      <a href="#" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
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