import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Founder() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative bg-starbucks-green-light text-white flex items-center justify-center px-4 py-16 md:py-20" ref={ref}>
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
        {/* === Left Images === */}
        <motion.div 
          className="relative w-full md:pb-20 flex items-center justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* CEO Image - Laxman Narasimhan */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <motion.img
                src="/dist/assets/laxman1.webp"
                alt="Laxman Narasimhan - CEO of Starbucks"
                className="w-full max-w-md h-auto object-cover rounded-2xl shadow-2xl border-4 border-white"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-starbucks-green-dark font-bold text-xl tracking-tight">Laxman Narasimhan</h3>
                <p className="text-gray-700 text-sm font-medium">Chief Executive Officer</p>
                <p className="text-gray-600 text-xs mt-1">Leading Starbucks since March 2023</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* === Right Content === */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.p 
            className="text-sm font-bold text-starbucks-gold uppercase mb-2 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Since 1971
          </motion.p>

          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Meet Our Visionary Leadership{" "}
            <span className="text-starbucks-gold">– Laxman Narasimhan, CEO</span>
          </motion.h2>

          <motion.p 
            className="text-gray-200 text-base sm:text-lg lg:text-xl mb-6 md:mt-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Under the leadership of CEO Laxman Narasimhan, Starbucks continues to innovate and expand its mission of inspiring and nurturing the human spirit. With a rich heritage dating back to 1971, Starbucks has grown from a single store in Seattle's Pike Place Market to over 38,000 stores across 85+ countries worldwide.
          </motion.p>

          <motion.p 
            className="text-gray-200 text-base sm:text-lg lg:text-xl mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Our leadership team is committed to building a sustainable future, creating meaningful connections, and delivering the Starbucks Experience with excellence. Through innovation, ethical sourcing, social responsibility, and a dedication to our 450,000+ partners (employees) and millions of customers, we're reinventing the future of coffee while staying true to our core values.
          </motion.p>

          <motion.p 
            className="border-l-4 border-starbucks-gold pl-6 text-gray-100 font-semibold text-lg mb-6 italic"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            "We're not just serving coffee. We're building community, inspiring possibility, and creating moments of connection."
          </motion.p>

          <div className="flex flex-wrap gap-4 pt-4">
            <motion.div 
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 flex-1 min-w-[140px] hover:bg-white/20 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-3xl font-bold text-starbucks-gold tracking-tighter">38,000+</p>
              <p className="text-sm text-gray-300 tracking-tight">Stores Globally</p>
            </motion.div>
            <motion.div 
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 flex-1 min-w-[140px] hover:bg-white/20 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-3xl font-bold text-starbucks-gold tracking-tighter">450K+</p>
              <p className="text-sm text-gray-300 tracking-tight">Partners (Employees)</p>
            </motion.div>
            <motion.div 
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 flex-1 min-w-[140px] hover:bg-white/20 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-3xl font-bold text-starbucks-gold tracking-tighter">85+</p>
              <p className="text-sm text-gray-300 tracking-tight">Countries Served</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

