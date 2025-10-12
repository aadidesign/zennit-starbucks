import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Showcase = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      id: 1,
      title: 'Starbucks Reserve Roastery',
      price: 'Premium Experience',
      address: 'Seattle, New York, Shanghai, Milan, Tokyo',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      title: 'Drive-Thru',
      price: 'Quick & Convenient',
      address: 'Available at thousands of locations',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      title: 'Mobile Order & Pay',
      price: 'Skip the Line',
      address: 'Order ahead via Starbucks app',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      title: 'Starbucks Delivers',
      price: 'To Your Door',
      address: 'Via Uber Eats in select markets',
      image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 5,
      title: 'Pickup Locations',
      price: 'Grab & Go',
      address: 'Airports, universities & more',
      image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 6,
      title: 'Starbucks Reserve Bars',
      price: 'Small-Lot Coffees',
      address: 'Exclusive coffee experiences',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="bg-white py-16 px-4 md:px-12" id="rewards" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Experience Starbucks in <span className="text-starbucks-green">unique ways</span>
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-lg max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            From our iconic cafes to innovative digital experiences, discover the many ways to enjoy your favorite Starbucks beverages wherever you are.
          </motion.p>
        </motion.div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {experiences.map((experience, idx) => (
            <motion.div 
              key={experience.id}
              className={`space-y-4 ${idx === 1 || idx === 4 ? 'md:mt-8' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <motion.div 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-starbucks-green/10"
                whileHover={{ y: -8 }}
              >
                <motion.img 
                  src={experience.image} 
                  alt={experience.title}
                  className={`w-full object-cover ${idx === 1 || idx === 4 ? 'h-80' : 'h-64'}`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="p-5 bg-gradient-to-b from-white to-starbucks-cream/30">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 text-lg tracking-tight">{experience.title}</h3>
                    <span className="font-semibold text-starbucks-green text-sm bg-starbucks-green/10 px-3 py-1 rounded-full tracking-tight">
                      {experience.price}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm flex items-center tracking-tight">
                    <svg className="w-4 h-4 mr-1.5 text-starbucks-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {experience.address}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button 
            className="bg-starbucks-green/10 border-2 border-starbucks-green text-starbucks-green-dark font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-starbucks-green hover:text-white inline-flex items-center gap-2 shadow-md tracking-tight"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Locations
            <svg className="w-5 h-5 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Showcase;

