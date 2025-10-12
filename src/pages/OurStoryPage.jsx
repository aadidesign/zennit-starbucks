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

      {/* Timeline */}
      <div className="py-16 px-4 bg-gradient-to-b from-starbucks-cream to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Journey</h2>
          <div className="space-y-8">
            {[
              { year: '1971', title: 'The Beginning', desc: 'Starbucks opens first store in Seattle\'s Pike Place Market' },
              { year: '1987', title: 'Howard Schultz', desc: 'Howard Schultz purchases Starbucks with a vision to bring Italian coffeehouse tradition to America' },
              { year: '1992', title: 'Going Public', desc: 'Starbucks becomes a publicly traded company' },
              { year: '2000', title: 'Global Expansion', desc: 'Starbucks operates in more than 30 countries' },
              { year: '2008', title: 'Innovation', desc: 'Launching the Starbucks Rewards program' },
              { year: '2020', title: 'Sustainability', desc: 'Commitment to becoming resource positive' },
              { year: '2024', title: 'Today', desc: 'Serving millions of customers across 80+ countries with 35,000+ stores' },
            ].map((milestone, idx) => (
              <div key={idx} className="flex gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="bg-starbucks-green text-white font-bold text-2xl w-24 h-24 rounded-full flex items-center justify-center">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-grow pt-4">
                  <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 text-lg">{milestone.desc}</p>
                </div>
              </div>
            ))}
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
          <button className="bg-white text-starbucks-green font-bold px-8 py-4 rounded-full hover:bg-starbucks-cream transition-all text-lg">
            Explore Careers
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurStoryPage;

