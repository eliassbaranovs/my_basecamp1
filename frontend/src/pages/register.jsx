import React from 'react';
import Button from '../components/button';
import Input from '../components/input';

const Register = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
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

              <div className="mt-6">
                <Button buttonText="Sign Up"/>

                  <div className="mt-6 text-center ">
                      <a href="#" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                          Already have an account?
                      </a>
                  </div>
              </div>
          </form>
      </div>
  </section>
  );
};

export default Register;