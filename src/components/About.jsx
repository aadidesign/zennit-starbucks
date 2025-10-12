import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="bg-gradient-to-b from-starbucks-cream to-gray-50 py-16 px-6 md:px-16" id="our-story" ref={ref}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Images */}
        <motion.div 
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4">
            <motion.img
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&auto=format&fit=crop&q=80"
              alt="Starbucks Store Experience"
              className="w-full h-48 object-cover rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            />
            <motion.img
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&auto=format&fit=crop&q=80"
              alt="Coffee Craftsmanship"
              className="w-full h-48 object-cover rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
            />
          </div>
          <motion.img
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&auto=format&fit=crop&q=80"
            alt="Premium Coffee Beans"
            className="w-full h-full object-cover rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.p 
            className="text-sm font-bold uppercase tracking-tighter text-starbucks-green mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Story
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Where{" "}
            <span className="text-starbucks-green">Passion</span> meets{" "}
            <span className="text-starbucks-green">Coffee</span> and{" "}
            <span className="text-starbucks-green">Community</span>
          </motion.h2>
          <motion.p 
            className="text-gray-700 leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <strong>Since 1971</strong>, Starbucks Coffee Company has been committed to ethically sourcing and roasting high-quality arabica coffee. Today, with stores around the globe, we are proud to be the premier roaster and retailer of specialty coffee in the world.
          </motion.p>
          <motion.p 
            className="text-gray-700 leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Our mission is to inspire and nurture the human spirit – one person, one cup and one neighborhood at a time. Through our unwavering commitment to excellence and our guiding principles, we bring the unique Starbucks Experience to life for every customer.
          </motion.p>
          <motion.p 
            className="text-gray-700 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            From our{" "}
            <span className="font-semibold text-starbucks-green">
              ethically sourced coffee beans
            </span>{" "}
            to our innovative beverage creations and commitment to environmental stewardship, we're dedicated to making a positive impact in everything we do.{" "}
            <span className="italic text-gray-900 font-medium">
              "To inspire and nurture the human spirit – one person, one cup, and one neighborhood at a time."
            </span>
          </motion.p>
          
          {/* Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-4 mt-8 p-6 bg-white rounded-xl shadow-md border-2 border-starbucks-green/20 hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <p className="text-3xl font-bold text-starbucks-green tracking-tighter">53+</p>
              <p className="text-sm text-gray-600 font-medium tracking-tight">Years Legacy</p>
            </motion.div>
            <motion.div 
              className="text-center border-x border-gray-200"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <p className="text-3xl font-bold text-starbucks-green tracking-tighter">38K+</p>
              <p className="text-sm text-gray-600 font-medium tracking-tight">Stores Worldwide</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <p className="text-3xl font-bold text-starbucks-green tracking-tighter">90M+</p>
              <p className="text-sm text-gray-600 font-medium tracking-tight">Customers Weekly</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

