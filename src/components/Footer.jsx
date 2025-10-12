import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const footerLinks = {
    'About Us': [
      { name: 'Our Company', url: 'https://www.starbucks.com/about-us/' },
      { name: 'Our Coffee', url: 'https://www.starbucks.com/coffee/' },
      { name: 'Stories and News', url: 'https://stories.starbucks.com/' },
      { name: 'Starbucks Archive', url: 'https://www.starbucks.com/about-us/company-information/starbucks-company-timeline' },
      { name: 'Investor Relations', url: 'https://investor.starbucks.com/' },
      { name: 'Customer Service', url: 'https://customerservice.starbucks.com/' }
    ],
    'Careers': [
      { name: 'Culture and Values', url: 'https://www.starbucks.com/careers/working-at-starbucks/culture-and-values/' },
      { name: 'Inclusion, Diversity, and Equity', url: 'https://www.starbucks.com/careers/working-at-starbucks/diversity-and-inclusion/' },
      { name: 'College Achievement Plan', url: 'https://www.starbucks.com/careers/working-at-starbucks/education/' },
      { name: 'U.S. Careers', url: 'https://www.starbucks.com/careers/' },
      { name: 'International Careers', url: 'https://www.starbucks.com/careers/find-a-job/' }
    ],
    'Social Impact': [
      { name: 'Ethical Sourcing', url: 'https://www.starbucks.com/responsibility/sourcing/coffee/' },
      { name: 'Leading in Sustainability', url: 'https://www.starbucks.com/responsibility/environment/' },
      { name: 'Strengthening Communities', url: 'https://www.starbucks.com/responsibility/community/' },
      { name: 'Creating Opportunities', url: 'https://www.starbucks.com/responsibility/community/opportunity-youth/' },
      { name: 'Global Social Impact Report', url: 'https://www.starbucks.com/responsibility/global-report/' }
    ],
    'For Business Partners': [
      { name: 'Landlord Support Center', url: 'https://www.starbucks.com/business/' },
      { name: 'Suppliers', url: 'https://www.starbucks.com/business/suppliers/' },
      { name: 'Corporate Gift Card Sales', url: 'https://www.starbucksbusinesssolutions.com/' },
      { name: 'Office and Foodservice Coffee', url: 'https://www.starbucks.com/business/office-coffee-service/' }
    ]
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Rewards', path: '/rewards' },
    { name: 'Gift Cards', path: '/gift-cards' },
    { name: 'Our Story', path: '/our-story' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-starbucks-green-light text-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Quick Links */}
        <motion.div 
          className="mb-12 pb-8 border-b border-white/20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h3 className="font-bold text-lg mb-4 tracking-tight">Quick Links</h3>
          <div className="flex flex-wrap gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link 
                  to={link.path}
                  className="text-gray-300 hover:text-white transition-all duration-300 tracking-tight"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links], catIndex) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            >
              <h3 className="font-bold text-lg mb-4 tracking-tight">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <motion.li 
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a 
                      href={link.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-all duration-300 text-sm tracking-tight inline-flex items-center gap-1"
                    >
                      {link.name}
                      <svg className="w-3 h-3 opacity-0 hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Media */}
        <motion.div 
          className="border-t border-white/20 pt-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center justify-center md:justify-start gap-6">
            <motion.a 
              href="https://www.facebook.com/Starbucks" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-starbucks-gold transition-all duration-300"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Facebook size={28} />
            </motion.a>
            <motion.a 
              href="https://www.instagram.com/starbucks" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-starbucks-gold transition-all duration-300"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Instagram size={28} />
            </motion.a>
            <motion.a 
              href="https://twitter.com/Starbucks" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-starbucks-gold transition-all duration-300"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Twitter size={28} />
            </motion.a>
            <motion.a 
              href="https://www.youtube.com/starbucks" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-starbucks-gold transition-all duration-300"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Youtube size={28} />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/company/starbucks" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-starbucks-gold transition-all duration-300"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Linkedin size={28} />
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom Links */}
        <motion.div 
          className="border-t border-white/20 pt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
              <a href="https://www.starbucks.com/terms/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-all duration-300 tracking-tight">Privacy Policy</a>
              <a href="https://www.starbucks.com/terms/starbucks-terms-of-use/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-all duration-300 tracking-tight">Terms of Use</a>
              <a href="https://www.starbucks.com/responsibility/sourcing/supply-chain-disclosure/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-all duration-300 tracking-tight">CA Supply Chain Act</a>
              <a href="https://www.starbucks.com/terms/starbucks-terms-of-use/#cookie-preferences" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-all duration-300 tracking-tight">Cookie Preferences</a>
            </div>
            <p className="text-gray-400 text-sm tracking-tight">
              © 2025 Starbucks Coffee Company. All rights reserved.
            </p>
          </div>
        </motion.div>

        {/* Developer Credit */}
        <motion.div 
          className="mt-8 text-center border-t border-white/10 pt-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-gray-400 text-sm tracking-tight">
            🚀 Developed by <span className="text-starbucks-gold font-semibold">Aadi</span> 
          </p>
          <p className="text-gray-500 text-xs mt-2 tracking-tight">
            Built with React, Tailwind CSS & AWS | Deployed on Vercel
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

