import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FAQ from '../components/FAQ';
import { MapPin, Phone, Mail, Clock, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { saveContactMessage } from '../lib/aws/authService';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setError('Please fill in all required fields');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const result = await saveContactMessage(formData);

      if (result.success) {
        setSuccess(result.message);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: 'General Inquiry',
          message: ''
        });
      } else {
        setError(result.error || 'Failed to send message');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Send message error:', err);
    } finally {
      setLoading(false);
    }
  };

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
            
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-green-700 text-sm">{success}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">First Name *</label>
                  <input 
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-starbucks-green focus:outline-none transition-colors"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Last Name *</label>
                  <input 
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-starbucks-green focus:outline-none transition-colors"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Email *</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-starbucks-green focus:outline-none transition-colors"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Phone (Optional)</label>
                <input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-starbucks-green focus:outline-none transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-starbucks-green focus:outline-none transition-colors"
                >
                  <option>General Inquiry</option>
                  <option>Product Feedback</option>
                  <option>Store Feedback</option>
                  <option>Partnership Opportunities</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Message *</label>
                <textarea 
                  rows="6"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-starbucks-green focus:outline-none transition-colors resize-none"
                  placeholder="Tell us how we can help you..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-starbucks-green text-white font-bold py-4 rounded-full hover:bg-starbucks-green-dark transition-all text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQ />

      {/* Starbucks HQ Location Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
              Our Global Headquarters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Located in the heart of Seattle, where our journey began in 1971
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-starbucks-green/10 p-3 rounded-xl">
                    <svg className="w-8 h-8 text-starbucks-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Starbucks Headquarters</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      2401 Utah Avenue South<br />
                      Seattle, WA 98134<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-starbucks-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">Established</p>
                      <p className="text-gray-600">1971 in Seattle's Pike Place Market</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-starbucks-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">Headquarters</p>
                      <p className="text-gray-600">Moved to current location in 1997</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-starbucks-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">Global Presence</p>
                      <p className="text-gray-600">38,000+ stores in 85+ countries</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <a 
                    href="https://www.google.com/maps/place/Starbucks+Support+Center/@47.5414196,-122.3301766,17z/data=!3m1!4b1!4m6!3m5!1s0x54904109e2fb8ebf:0x953cc87f47d168f0!8m2!3d47.5414196!4d-122.3301766!16s%2Fg%2F11c0m1k5k1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-starbucks-green text-white px-6 py-3 rounded-full font-semibold hover:bg-starbucks-green-dark transition-all duration-300 group"
                  >
                    <span>Get Directions</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right side - Map */}
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[600px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2691.4749891852443!2d-122.33235842339!3d47.54141967118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54904109e2fb8ebf%3A0x953cc87f47d168f0!2sStarbucks%20Support%20Center%2C%202401%20Utah%20Ave%20S%2C%20Seattle%2C%20WA%2098134%2C%20USA!5e0!3m2!1sen!2sus!4v1704067200000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Starbucks Support Center - 2401 Utah Avenue South, Seattle, WA 98134, USA"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

