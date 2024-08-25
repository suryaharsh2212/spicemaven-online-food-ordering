
import React from 'react';
import Grid from './Grid';
import { Link } from 'react-router-dom';

export const Hero = () => {
   
  return (
    <div>
    <section className="relative bg-gray-900 md:h-screen   overflow-hidden">
    {/* Background Image and Overlay */}
    <div className="absolute inset-0">
      <img
        className="object-cover w-full h-full bg-orange-500 brightness-50"
        src="https://res.cloudinary.com/dllgqcla4/image/upload/v1723115190/0_plcxo9.jpg" 
        // src='https://img.freepik.com/free-vector/hand-drawn-healthy-food-background_23-2148121040.jpg?uid=R81792226&ga=GA1.1.1500486508.1710956728&semt=ais_hybrid' 
        alt="Restaurant background"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
    </div>

    {/* Hero Content */}
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-16 px-4 text-center">
      <h1 className="text-5xl text-slate-300 font-extrabold mb-6 leading-tight tracking-tight md:text-6xl lg:text-7xl transition-transform transform hover:scale-105">
        Welcome to Spice Haven
      </h1>
      <p className="text-slate-100 mb-8 max-w-2xl text-2xl mx-auto leading-relaxed">
        Discover an extraordinary dining experience with our vibrant flavors and aromatic spices. A culinary journey that tantalizes your taste buds.
      </p>
      <button
      onClick={() => document.getElementById('my_modal_6').showModal()}
       
        className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-yellow-400 hover:shadow-xl transition duration-300 transform hover:scale-105"
      >
        Get Started
      </button>
    </div>
  </section>
  <Grid/>
  </div>
  
  );
};

export default Hero;
