import { MessageSquare } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Icon for the accordion (plus/minus)
const AccordionIcon = ({ isOpen }) => (
  <div className="relative w-6 h-6">
    <span className={`absolute h-0.5 w-4 bg-starbucks-green top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-90'}`}></span>
    <span className="absolute h-0.5 w-4 bg-starbucks-green top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
  </div>
);

// --- Static Data for FAQs ---
const faqData = [
  {
    question: 'How do I join Starbucks Rewards?',
    answer: 'Download the Starbucks® app and create an account. You\'ll start earning Stars with every purchase. It\'s free to join and you can start earning rewards right away!',
  },
  {
    question: 'What payment methods does Starbucks accept?',
    answer: 'We accept cash, credit/debit cards, mobile payments (Apple Pay, Google Pay), Starbucks Cards, and the Starbucks app. You can also use PayPal in select locations.',
  },
  {
    question: 'Are Starbucks drinks customizable?',
    answer: 'Absolutely! We pride ourselves on customization. You can modify milk types, add flavor shots, adjust sweetness, add extra espresso shots, and more. Your barista will help create your perfect drink.',
  },
  {
    question: 'Does Starbucks offer dairy-free and vegan options?',
    answer: 'Yes! We offer several plant-based milk alternatives including soy, almond, coconut, and oat milk. We also have a selection of vegan food items clearly marked on our menu.',
  },
  {
    question: 'How can I find the nearest Starbucks location?',
    answer: 'Use our Store Locator on the Starbucks app or website. Enter your location to find nearby stores, view hours, amenities, and even get directions. You can filter by features like drive-thru, mobile order pickup, and more.',
  },
];

// --- Main FAQ Component ---
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-starbucks-cream font-sans w-full min-h-screen flex items-center justify-center p-4 relative overflow-hidden" ref={ref}>
      {/* Decorative background shapes */}
      <motion.div 
        aria-hidden="true" 
        className="absolute top-10 left-0 -translate-x-1/4 lg:translate-x-0 opacity-20"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="h-20 w-20 md:h-32 md:w-32 bg-starbucks-green rounded-full"></div>
      </motion.div>
      <motion.div 
        aria-hidden="true" 
        className="absolute -top-24 -right-24 lg:-top-16 lg:-right-16 transform rotate-12 opacity-10"
        initial={{ scale: 0, rotate: 0 }}
        animate={inView ? { scale: 1, rotate: 12 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="h-40 w-40 bg-starbucks-gold rounded-lg"></div>
      </motion.div>

      <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 z-10">
        <motion.div 
          className="text-left mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tighter leading-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Frequently<br />
            <span className="text-starbucks-green">asked questions</span>
          </motion.h1>
          <motion.p 
            className="mt-4 text-gray-600 text-lg leading-relaxed"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Everything you need to know about Starbucks
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left Column: Accordion List */}
          <div className="lg:col-span-3 space-y-4">
            {faqData.map((faq, index) => (
              <motion.div 
                key={index} 
                className="border-2 border-starbucks-green/30 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-starbucks-green transition-all duration-300"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4 tracking-tight">{faq.question}</h3>
                  <span className="ml-4 flex-shrink-0">
                    <AccordionIcon isOpen={openIndex === index} />
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Contact Card */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-gradient-to-br from-starbucks-green to-starbucks-green-dark border-2 border-starbucks-green rounded-xl p-8 text-center flex flex-col items-center justify-center h-full shadow-xl hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <MessageSquare fill="white" className="h-16 w-16 text-white mb-6" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tighter">
                Still have questions?
              </h3>
              <p className="text-white/90 mb-8 max-w-xs leading-relaxed">
                Our customer support team is here to help. Reach out to us for any questions about products, rewards, or your orders.
              </p>
              <motion.a
                href="mailto:support@starbucks.com"
                className="w-full bg-white text-starbucks-green font-bold py-3 px-6 rounded-full hover:bg-starbucks-cream transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white tracking-tight"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Support
              </motion.a>
              <p className="mt-6 text-white/80 text-sm tracking-tight">
                Or call us at <strong>1-800-STARBUCKS</strong>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

