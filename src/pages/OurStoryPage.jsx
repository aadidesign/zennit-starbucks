import React from 'react';
import About from '../components/About';
import Founder from '../components/Founder';
import { Heart, Globe, Users, Leaf } from 'lucide-react';

const OurStoryPage = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-starbucks-green-light text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Since 1971, we've been committed to ethically sourcing and roasting the highest quality arabica coffee in the world
          </p>
        </div>
      </div>

      {/* About Component */}
      <About />

      {/* Mission & Values */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Mission & Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-starbucks-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-starbucks-green" />
              </div>
              <h3 className="text-xl font-bold mb-3">Create a culture of warmth</h3>
              <p className="text-gray-600">Where everyone belongs</p>
            </div>
            <div className="text-center">
              <div className="bg-starbucks-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-starbucks-green" />
              </div>
              <h3 className="text-xl font-bold mb-3">Act with courage</h3>
              <p className="text-gray-600">Challenge the status quo</p>
            </div>
            <div className="text-center">
              <div className="bg-starbucks-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-10 h-10 text-starbucks-green" />
              </div>
              <h3 className="text-xl font-bold mb-3">Be present</h3>
              <p className="text-gray-600">Connect with transparency</p>
            </div>
            <div className="text-center">
              <div className="bg-starbucks-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-10 h-10 text-starbucks-green" />
              </div>
              <h3 className="text-xl font-bold mb-3">Deliver our best</h3>
              <p className="text-gray-600">In all we do</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline - Enhanced Journey Section */}
      <div className="py-16 px-4 bg-gradient-to-b from-starbucks-cream to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gray-900 tracking-tight">Our Journey Through Time</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">From a single store in Seattle to a global coffee movement that connects millions of people every day</p>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-16 top-0 bottom-0 w-1 bg-gradient-to-b from-starbucks-green via-starbucks-gold to-starbucks-green"></div>
            
            <div className="space-y-12">
              {[
                { year: '1971', title: 'The Beginning', desc: 'Starbucks opens first store in Seattle\'s Pike Place Market, selling fresh-roasted coffee beans' },
                { year: '1987', title: 'Howard Schultz Era', desc: 'Howard Schultz purchases Starbucks with a vision to bring Italian coffeehouse tradition to America' },
                { year: '1992', title: 'Going Public', desc: 'Starbucks becomes a publicly traded company, marking a new chapter in growth' },
                { year: '2000', title: 'Global Expansion', desc: 'Starbucks operates in more than 30 countries, bringing the coffee experience worldwide' },
                { year: '2008', title: 'Digital Innovation', desc: 'Launching the Starbucks Rewards program and mobile app, revolutionizing customer experience' },
                { year: '2020', title: 'Sustainability Commitment', desc: 'Commitment to becoming resource positive - giving more than we take from the planet' },
                { year: '2023', title: 'New Leadership', desc: 'Laxman Narasimhan becomes CEO, leading Starbucks into a new era of innovation and growth' },
                { year: '2025', title: 'Today & Beyond', desc: 'Serving millions of customers across 85+ countries with 38,000+ stores, continuing to innovate' },
              ].map((milestone, idx) => (
                <div key={idx} className="flex gap-6 md:gap-12 items-center relative">
                  <div className="flex-shrink-0 z-10">
                    <div className="bg-gradient-to-br from-starbucks-green to-starbucks-green-dark text-white font-bold text-xl md:text-2xl w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-xl border-4 border-white relative overflow-hidden group hover:scale-110 transition-transform duration-300">
                      <span className="relative z-10">{milestone.year}</span>
                      <div className="absolute inset-0 bg-starbucks-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <div className="flex-grow bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-starbucks-gold font-bold text-sm uppercase tracking-wider">Milestone {idx + 1}</span>
                        <span className="flex-grow h-px bg-gradient-to-r from-starbucks-gold to-transparent"></span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 group-hover:text-starbucks-green transition-colors">{milestone.title}</h3>
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">{milestone.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Founder Component */}
      <Founder />


      {/* CTA */}
      <div className="bg-starbucks-green text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join us in making a difference
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Be part of our story. Explore career opportunities and see how you can contribute to our mission.
          </p>
          <a 
            href="https://www.starbucks.com/careers/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-starbucks-green font-bold px-8 py-4 rounded-full hover:bg-starbucks-cream transition-all text-lg hover:scale-105 transform"
          >
            Explore Careers
          </a>
        </div>
      </div>
    </div>
  );
};

export default OurStoryPage;

