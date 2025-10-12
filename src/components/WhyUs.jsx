import {
  Coffee,
  Award,
  Heart,
  Users,
  Leaf,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function WhyUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      title: "Premium Quality Beans",
      desc: "100% ethically sourced Arabica coffee beans from the finest farms.",
      icon: <Coffee className="w-16 h-16 text-starbucks-green" strokeWidth={1.25} />,
    },
    {
      title: "Award-Winning Beverages",
      desc: "Recognized globally for our innovative and delicious drink creations.",
      icon: <Award className="w-16 h-16 text-starbucks-green" strokeWidth={1.25} />,
    },
    {
      title: "Community Connection",
      desc: "Building relationships and creating a welcoming third place.",
      icon: <Users className="w-16 h-16 text-starbucks-green" strokeWidth={1.25} />,
    },
    {
      title: "Sustainability First",
      desc: "Committed to environmental stewardship and ethical practices.",
      icon: <Leaf className="w-16 h-16 text-starbucks-green" strokeWidth={1.25} />,
    },
    {
      title: "Rewards Program",
      desc: "Earn stars and get free drinks, food, and exclusive offers.",
      icon: <Heart className="w-16 h-16 text-starbucks-green" strokeWidth={1.25} />,
    },
    {
      title: "Quality Guaranteed",
      desc: "Every beverage is handcrafted to perfection or we'll remake it.",
      icon: <Shield className="w-16 h-16 text-starbucks-green" strokeWidth={1.25} />,
    },
  ];

  return (
    <section className="bg-white py-16 px-4 md:px-20" ref={ref}>
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tighter leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Why choose <span className="text-starbucks-green">Starbucks</span>? ☕
        </motion.h2>
        <motion.p 
          className="text-gray-600 text-lg mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          More than coffee, we offer an experience. Discover what makes us the world's most beloved coffeehouse.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 border-t-2 border-l-2 border-starbucks-green/20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="border-r-2 border-b-2 border-starbucks-green/20 p-8 md:p-10 flex flex-col items-center text-center hover:bg-starbucks-cream/50 transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="mb-6"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>
              <h4 className="text-xl md:text-2xl tracking-tighter font-bold text-gray-900 mb-3 leading-tight">
                {feature.title}
              </h4>
              <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed tracking-tight">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional CTA */}
        <motion.div 
          className="mt-12 bg-gradient-to-r from-starbucks-green to-starbucks-green-dark text-white rounded-2xl p-8 md:p-12 hover:shadow-2xl transition-all duration-300"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tighter leading-tight">Join Starbucks® Rewards</h3>
          <p className="text-lg mb-6 opacity-90 leading-relaxed">
            Join now and start earning stars with every purchase. Get free drinks, food, and more!
          </p>
          <motion.button 
            className="bg-white text-starbucks-green font-bold px-8 py-4 rounded-full hover:bg-starbucks-cream transition-all duration-300 shadow-lg tracking-tight"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up Now - It's Free
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

