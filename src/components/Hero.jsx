import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="p-5 lg:p-10 flex flex-col lg:flex-row justify-between gap-12 lg:gap-10">
      {/* Left section */}
      <motion.div 
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2 items-center lg:items-center text-center lg:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Headline */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tighter leading-tight flex flex-col gap-3">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The <span className="text-starbucks-green">best place</span> to
          </motion.h1>
          <motion.div 
            className="flex justify-center lg:justify-start items-center gap-2 sm:gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h1>enjoy</h1>
            <motion.img
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&auto=format&fit=crop&q=80"
              alt="Premium Starbucks Coffee"
              className="h-12 w-20 sm:h-16 sm:w-28 rounded-full object-cover shadow-md"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <h1 className="text-starbucks-green">premium</h1>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="text-starbucks-green">coffee</span> every day
          </motion.h1>
        </div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex items-center gap-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/menu"
              className="px-5 py-3 text-white bg-starbucks-green rounded-2xl text-sm sm:text-base font-semibold hover:bg-starbucks-green-dark transition-all"
            >
              Order Now
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 45 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link
              to="/rewards"
              className="bg-starbucks-green rounded-full h-12 w-12 flex items-center justify-center hover:bg-starbucks-green-dark transition"
            >
              <svg
                className="text-white w-5 h-5 -rotate-45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="flex flex-col sm:flex-row flex-wrap gap-4 w-full border border-slate-300 rounded-3xl p-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {/* Location Dropdown */}
          <div className="relative w-full sm:min-w-[200px] flex-1">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c4.97-4.97 8-9.18 8-13a8 8 0 10-16 0c0 3.82 3.03 8.03 8 13z" />
              <circle cx="12" cy="8" r="3" />
            </svg>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <select className="w-full pl-10 pr-10 py-3 text-base rounded-xl shadow-sm focus:outline-none appearance-none">
              <option>Find a Store</option>
              <option>New York</option>
              <option>Los Angeles</option>
              <option>Chicago</option>
              <option>Seattle</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:min-w-[250px] flex-1">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search for drinks, food..."
              className="w-full pl-10 pr-3 py-3 text-base rounded-xl shadow-sm focus:outline-none"
            />
          </div>

          {/* Drink Type */}
          <div className="relative w-full sm:min-w-[150px] flex-1">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h16M3 21h16M7 9h8v8a4 4 0 01-8 0V9z" />
            </svg>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <select className="w-full pl-10 pr-10 py-3 text-base rounded-xl shadow-sm focus:outline-none appearance-none">
              <option>All Drinks</option>
              <option>Hot Coffee</option>
              <option>Iced Coffee</option>
              <option>Frappuccino</option>
            </select>
          </div>
        </motion.div>

        {/* Bottom Row - Trust Section */}
        <motion.div 
          className="flex md:flex-row flex-col h-full w-full gap-10 items-center justify-center p-4 rounded-3xl md:-mt-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/menu"
              className="bg-green-50 border-2 border-starbucks-green rounded-3xl px-6 py-3 text-starbucks-green-dark font-semibold hover:bg-starbucks-green hover:text-white transition flex items-center gap-2"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              width="18"
              height="18"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Explore Menu
            </Link>
          </motion.div>

          <motion.div 
            className="flex gap-2 items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <p className="font-semibold tracking-tighter">
              Trusted by millions
              <br />
              <span className="text-starbucks-green">worldwide</span>
            </p>
            <div className="flex -space-x-4">
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&h=80&auto=format&fit=crop&q=80" 
                  alt="Coffee Cup" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=80&h=80&auto=format&fit=crop&q=80" 
                  alt="Coffee Beans" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1560072810-1cffb09faf0f?w=80&h=80&auto=format&fit=crop&q=80" 
                  alt="Coffee Shop" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=80&h=80&auto=format&fit=crop&q=80" 
                  alt="Barista" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=80&h=80&auto=format&fit=crop&q=80" 
                  alt="Coffee Roasting" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-starbucks-green text-white font-bold text-xs border-2 border-white shadow-lg">
                +90M
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right section - Images */}
      <motion.div 
        className="w-full lg:w-1/2 grid grid-cols-2 gap-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80"
          alt="Starbucks Coffee Cup with Latte Art"
          className="w-full lg:h-60 sm:h-72 object-cover rounded-xl shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        />
        <motion.img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80"
          alt="Starbucks Coffee and Pastries"
          className="w-full lg:h-48 sm:h-64 object-cover rounded-xl shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05, rotate: -2 }}
        />
        <motion.img
          src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&auto=format&fit=crop&q=80"
          alt="Starbucks Barista Making Coffee"
          className="w-full lg:h-52 sm:h-60 object-cover rounded-xl shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        />
        <motion.img
          src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&auto=format&fit=crop&q=80"
          alt="Freshly Roasted Coffee Beans"
          className="w-full lg:h-72 sm:h-80 object-cover rounded-xl shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05, rotate: -2 }}
        />
      </motion.div>
    </div>
  );
};

export default Hero;
