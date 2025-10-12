import React from 'react';
import FAQ from '../components/FAQ';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-starbucks-green to-starbucks-green-dark text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            We're here to help. Get in touch with us today.
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-starbucks-cream rounded-xl p-8 text-center hover:shadow-lg transition-all">
              <Phone className="w-12 h-12 mx-auto mb-4 text-starbucks-green" />
              <h3 className="text-xl font-bold mb-3">Call Us</h3>
              <p className="text-gray-600 mb-2">1-800-STARBUCKS</p>
              <p className="text-sm text-gray-500">(1-800-782-7282)</p>
            </div>
            <div className="bg-starbucks-cream rounded-xl p-8 text-center hover:shadow-lg transition-all">
              <Mail className="w-12 h-12 mx-auto mb-4 text-starbucks-green" />
              <h3 className="text-xl font-bold mb-3">Email Us</h3>
              <p className="text-gray-600 mb-2">support@starbucks.com</p>
              <p className="text-sm text-gray-500">24/7 Support</p>
            </div>
            <div className="bg-starbucks-cream rounded-xl p-8 text-center hover:shadow-lg transition-all">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-starbucks-green" />
              <h3 className="text-xl font-bold mb-3">Visit Us</h3>
              <p className="text-gray-600 mb-2">Find a Store Near You</p>
              <p className="text-sm text-gray-500">35,000+ locations</p>
            </div>
            <div className="bg-starbucks-cream rounded-xl p-8 text-center hover:shadow-lg transition-all">
              <Clock className="w-12 h-12 mx-auto mb-4 text-starbucks-green" />
              <h3 className="text-xl font-bold mb-3">Hours</h3>
              <p className="text-gray-600 mb-2">Mon-Sun: 6AM-10PM</p>
              <p className="text-sm text-gray-500">Hours may vary by location</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-starbucks-green/20">
            <h3 className="text-3xl font-bold mb-8 text-center">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-starbucks-green focus:outline-none transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-starbucks-green focus:outline-none transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-starbucks-green focus:outline-none transition-colors"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Phone (Optional)</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-starbucks-green focus:outline-none transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Subject</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-starbucks-green focus:outline-none transition-colors">
                  <option>General Inquiry</option>
                  <option>Product Feedback</option>
                  <option>Store Feedback</option>
                  <option>Partnership Opportunities</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Message</label>
                <textarea 
                  rows="6" 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-starbucks-green focus:outline-none transition-colors resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-starbucks-green text-white font-bold py-4 rounded-full hover:bg-starbucks-green-dark transition-all text-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQ />

      {/* Map Section */}
      <div className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Headquarters Location</h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-starbucks-green" />
                <p className="text-xl font-semibold">Starbucks Headquarters</p>
                <p className="text-gray-600">2401 Utah Avenue South</p>
                <p className="text-gray-600">Seattle, WA 98134, USA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

