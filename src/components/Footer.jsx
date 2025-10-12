import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    'About Us': ['Our Company', 'Our Coffee', 'Stories and News', 'Starbucks Archive', 'Investor Relations', 'Customer Service'],
    'Careers': ['Culture and Values', 'Inclusion, Diversity, and Equity', 'College Achievement Plan', 'U.S. Careers', 'International Careers'],
    'Social Impact': ['Ethical Sourcing', 'Leading in Sustainability', 'Strengthening Communities', 'Creating Opportunities', 'Global Social Impact Report'],
    'For Business Partners': ['Landlord Support Center', 'Suppliers', 'Corporate Gift Card Sales', 'Office and Foodservice Coffee']
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
    <footer className="bg-starbucks-green-light text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Quick Links */}
        <div className="mb-12 pb-8 border-b border-white/20">
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <div className="flex flex-wrap gap-6">
            {quickLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-lg mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="flex items-center justify-center md:justify-start gap-6">
            <a href="https://www.facebook.com/Starbucks" target="_blank" rel="noopener noreferrer" className="hover:text-starbucks-gold transition-colors">
              <Facebook size={28} />
            </a>
            <a href="https://www.instagram.com/starbucks" target="_blank" rel="noopener noreferrer" className="hover:text-starbucks-gold transition-colors">
              <Instagram size={28} />
            </a>
            <a href="https://twitter.com/Starbucks" target="_blank" rel="noopener noreferrer" className="hover:text-starbucks-gold transition-colors">
              <Twitter size={28} />
            </a>
            <a href="https://www.youtube.com/starbucks" target="_blank" rel="noopener noreferrer" className="hover:text-starbucks-gold transition-colors">
              <Youtube size={28} />
            </a>
            <a href="https://www.linkedin.com/company/starbucks" target="_blank" rel="noopener noreferrer" className="hover:text-starbucks-gold transition-colors">
              <Linkedin size={28} />
            </a>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">CA Supply Chain Act</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Preferences</a>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 Starbucks Coffee Company. All rights reserved.
            </p>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="mt-8 text-center border-t border-white/10 pt-6">
          <p className="text-gray-400 text-sm">
            🚀 Developed by <span className="text-starbucks-gold font-semibold">Aadi</span> for Frontend Hackathon & Cloud Computing Project
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Built with React, Tailwind CSS, Supabase & AWS | Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

