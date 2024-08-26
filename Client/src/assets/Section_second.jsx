import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Sample data for job positions
const restaurantQualities = [
  { title: "Customer Reviews", description: "Rated 4.8/5 based on over 500 customer reviews." },
  { title: "Authentic Cuisine", description: "Authentic Indian dishes with a modern twist." },
  { title: "Award-Winning", description: "Winner of the Best New Restaurant Award 2024." },
  { title: "Fresh Ingredients", description: "Locally sourced, organic ingredients used in every dish." },
  { title: "Friendly Service", description: "Known for our warm and welcoming customer service." }
];

function Section_second() {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.1,
  });
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{fontFamily:'philobold'}}
    >
      <section>
        <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
              <h2 className="text-3xl font-bold sm:text-4xl">Discover What Makes Spice Maven Stand Out</h2>

              <p className="mt-4 text-gray-600">
              We serve a diverse array of traditional Indian dishes, each crafted with authentic spices and ingredients that capture the essence of Indian cuisine
              </p>

              
              <div className="mt-8">
                <img src="https://cdn.pixabay.com/photo/2020/01/17/16/42/food-4773380_640.jpg" alt="Restaurant" className="mx-auto" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {restaurantQualities.map((position, index) => (
                <button
                  key={index}
                  className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                  
                >
                  <span className="inline-block rounded-lg bg-gray-50 p-3">
                    <svg
                      className="size-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      ></path>
                    </svg>
                  </span>

                  <h2 className="mt-2 font-bold">{position.title}</h2>

                  <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                    {position.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default Section_second;
