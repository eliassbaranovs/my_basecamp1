import React from 'react';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import Button from '../components/button';

const Homepage = () => {
  return (
    <>
      <Navbar />        
        <div
          className="w-full bg-center bg-cover h-[38rem]"
          style={{
            backgroundImage: "url('src/assets/logo.png')"
          }}
        >
          <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
              <div className="text-center">
                  <h1 className="text-3xl font-semibold text-white lg:text-4xl mb-8">Build your new <span className="text-blue-400">BEIJZKAMP</span> Project</h1>
                  <Button buttonText="I FEEL LUCKY!" /> 
              </div>
          </div>
      </div>
      <Footer />
  </>
  );
};

export default Homepage;