import React from 'react';
import Button from '../components/button';
import Input from '../components/input';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

const Login = () => {
  return (
  <>
    <Navbar />
      <div className="flex items-center justify-center min-h-screen w-full bg-white dark:bg-gray-800">
        <div className="w-full max-w-md px-6 py-4">
            <div className="flex justify-center mx-auto">
                <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
            </div>
            <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>

            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>

            <form>
                <div className="w-full mt-4">
                  <Input inputPlaceholder="Email Address"/>
                </div>

                <div className="w-full mt-4">
                  <Input inputPlaceholder="Password"/>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <a href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forget Password?</a>
                    <Button buttonText="Sign In"/>
                </div>
            </form>
              <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700 mt-6">
                <span className="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>

                <a href="#" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Register</a>
          </div>
        </div>
    </div>
  <Footer/>
  </>
  );
};

export default Login;