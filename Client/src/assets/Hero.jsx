import { motion } from "framer-motion";
import Grid from './Grid';
import Section_second from './Section_second';
import DeliveryIcon from "./DeliveryIcon";


export const Hero = () => {
  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const variantsSecond = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <div  style={{fontFamily:"philobold"}}>
      <section className="relative  md:h-screen overflow-hidden">
        {/* Background Image and Overlay */}
        <div className="absolute inset-0">
          <img
            className="object-cover w-full h-full bg-orange-500 brightness-90" 
            src="https://cdn.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784_1280.jpg" 
            // src="https://cdn.pixabay.com/photo/2017/06/06/22/37/italian-cuisine-2378729_640.jpg" 
            alt="Restaurant background" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-orange via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center justify-center min-h-screen py-16 px-4 text-center"
        >
        {/* <DeliveryIcon/>  */}
          <h1 className="text-5xl text-slate-300 font-extrabold mb-6 leading-tight tracking-tight md:text-6xl lg:text-7xl transition-transform transform hover:scale-105">
            Welcome to <span className=" text-orange-500">Spice Haven</span>
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
        </motion.div>
        
      </section>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={variantsSecond}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Trusted by Food Lovers Nationwide</h2>
          <p className="mt-4 text-gray-500 sm:text-xl">
            Spice Haven has been serving delicious and authentic cuisine, gaining the trust of countless food enthusiasts across the country.
          </p>
        </div>

        <dl className="mg-6 grid grid-cols-1 gap-4 divide-y divide-gray-100 sm:mt-8 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          <div className="flex flex-col px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">Total Orders</dt>
            <dd className="text-4xl font-extrabold text-red-600 md:text-5xl">150k+</dd>
          </div>

          <div className="flex flex-col px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">Happy Customers</dt>
            <dd className="text-4xl font-extrabold text-red-600 md:text-5xl">50k+</dd>
          </div>

          <div className="flex flex-col px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">Menu Items</dt>
            <dd className="text-4xl font-extrabold text-red-600 md:text-5xl">120+</dd>
          </div>

          <div className="flex flex-col px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">Positive Reviews</dt>
            <dd className="text-4xl font-extrabold text-red-600 md:text-5xl">25k+</dd>
          </div>
        </dl>
      </motion.div>

      <Section_second />
      {/* <Grid />  */}
    </div>
  );
};

export default Hero;
