import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      title: "Mobile Order & Pay",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80",
      description: "Order ahead via app and pick up at store"
    },
    {
      title: "Starbucks Delivers",
      image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&auto=format&fit=crop&q=80",
      description: "Get Starbucks delivered via Uber Eats"
    },
    {
      title: "Starbucks Reserve",
      image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&auto=format&fit=crop&q=80",
      description: "Premium small-lot coffee experiences"
    },
    {
      title: "Drive-Thru",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&auto=format&fit=crop&q=80",
      description: "Quick and convenient drive-thru service"
    }
  ];

  return (
    <div className="px-6 md:px-10 mt-10 bg-gradient-to-b from-gray-50 to-white py-16" id="gift-cards" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="font-bold text-4xl md:text-5xl tracking-tighter text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            How can we <span className="text-starbucks-green">serve</span> you?
          </motion.h1>
          <motion.p 
            className="text-base md:text-lg text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Explore our services designed to make your Starbucks experience even more convenient and enjoyable
          </motion.p>
        </motion.div>
        
        <div className="flex flex-wrap gap-6 justify-center mt-12">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="w-full sm:w-[280px] bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="relative h-[200px] overflow-hidden">
                <motion.img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl tracking-tighter">
                  {service.title}
                </h3>
              </div>
              <div className="p-5">
                <p className="text-gray-600 text-sm font-medium tracking-tight">{service.description}</p>
                <motion.button 
                  className="mt-4 w-full bg-starbucks-green text-white font-semibold py-2.5 rounded-lg hover:bg-starbucks-green-dark transition-all duration-300 tracking-tight"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Service Info */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <motion.div 
            className="bg-starbucks-green/5 border-2 border-starbucks-green/20 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tighter">🎁 Gift Cards</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Share the Starbucks experience with friends and loved ones. Our gift cards are perfect for any occasion.
            </p>
            <motion.button 
              className="bg-starbucks-green text-white font-semibold px-6 py-3 rounded-full hover:bg-starbucks-green-dark transition-all duration-300 tracking-tight"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Buy Gift Cards
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="bg-starbucks-gold/10 border-2 border-starbucks-gold/30 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tighter">⭐ Starbucks Rewards</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Earn stars with every purchase and unlock free drinks, birthday rewards, and exclusive member perks.
            </p>
            <motion.button 
              className="bg-starbucks-gold text-white font-semibold px-6 py-3 rounded-full hover:bg-starbucks-gold/80 transition-all duration-300 tracking-tight"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Rewards
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Services;

