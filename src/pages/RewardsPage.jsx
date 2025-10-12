import React from 'react';
import WhyUs from '../components/WhyUs';
import { Star, Gift, Zap, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const RewardsPage = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-br from-starbucks-green to-starbucks-green-dark text-white py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Starbucks® Rewards
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Free coffee is a tap away
          </motion.p>
          <motion.button 
            className="bg-white text-starbucks-green font-bold px-8 py-4 rounded-full hover:bg-starbucks-cream transition-all duration-300 text-lg tracking-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Now
          </motion.button>
        </div>
      </motion.div>

      {/* How It Works */}
      <div className="py-16 px-4 bg-white" ref={ref1}>
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 tracking-tighter"
            initial={{ opacity: 0, y: 30 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Getting started is easy
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Create an account', desc: 'Join Starbucks® Rewards to earn Stars with every purchase' },
              { num: '2', title: 'Order and pay', desc: 'Use our app to pay and collect Stars with every purchase' },
              { num: '3', title: 'Get rewarded', desc: 'Redeem your Stars for free drinks, food, and more' }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <motion.div 
                  className="bg-starbucks-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 98, 65, 0.2)' }}
                >
                  <span className="text-3xl font-bold text-starbucks-green tracking-tighter">{step.num}</span>
                </motion.div>
                <h3 className="text-xl font-bold mb-3 tracking-tight">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Rewards Tiers */}
      <div className="py-16 px-4 bg-starbucks-cream" ref={ref2}>
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 tracking-tighter"
            initial={{ opacity: 0, y: 30 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Rewards you'll love
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { stars: '25', title: 'Customize your drink', icon: <Zap className="w-12 h-12" /> },
              { stars: '50', title: 'Brewed hot coffee, tea or bakery item', icon: <Gift className="w-12 h-12" /> },
              { stars: '150', title: 'Handcrafted drink, hot breakfast or parfait', icon: <Star className="w-12 h-12" /> },
              { stars: '200', title: 'Lunch sandwich, protein box or salad', icon: <Award className="w-12 h-12" /> },
            ].map((reward, idx) => (
              <motion.div 
                key={idx} 
                className="bg-white rounded-xl p-8 flex items-start gap-6 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                animate={inView2 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div 
                  className="text-starbucks-green flex-shrink-0"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {reward.icon}
                </motion.div>
                <div>
                  <div className="text-starbucks-green font-bold text-2xl mb-2 tracking-tighter">{reward.stars} ★</div>
                  <h3 className="text-xl font-bold mb-2 tracking-tight">{reward.title}</h3>
                  <p className="text-gray-600 leading-relaxed">Redeem {reward.stars} Stars for your favorite items</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <WhyUs />
    </div>
  );
};

export default RewardsPage;

