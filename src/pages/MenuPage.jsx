import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MenuPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="pt-20">
      {/* Page Header */}
      <motion.div 
        className="bg-gradient-to-b from-starbucks-cream to-white py-16 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tighter leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our <span className="text-starbucks-green">Menu</span>
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Discover our handcrafted beverages and delicious food offerings, made with premium ingredients and expert care.
          </motion.p>
        </div>
      </motion.div>
      
      {/* Products */}
      <ProductGrid />
      
      {/* Additional Menu Categories */}
      <div className="bg-white py-16 px-4" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Explore Categories
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-6">
            {['Hot Coffees', 'Cold Coffees', 'Frappuccino®', 'Teas', 'Food', 'Bakery', 'Merchandise', 'At Home Coffee'].map((category, idx) => (
              <motion.div 
                key={idx} 
                className="bg-starbucks-cream rounded-xl p-6 text-center hover:shadow-lg cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <h3 className="font-bold text-lg text-gray-900 tracking-tight">{category}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;

