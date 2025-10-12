import React from "react";

const About = () => {
  return (
    <section className="bg-gradient-to-b from-starbucks-cream to-gray-50 py-16 px-6 md:px-16" id="our-story">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Images */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80"
              alt="Starbucks Coffee"
              className="w-full h-48 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform"
            />
            <img
              src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&auto=format&fit=crop&q=80"
              alt="Barista"
              className="w-full h-48 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform"
            />
          </div>
          <img
            src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop&q=80"
            alt="Coffee Beans"
            className="w-full h-full object-cover rounded-xl shadow-lg hover:scale-105 transition-transform"
          />
        </div>

        {/* Right Content */}
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-starbucks-green mb-3">
            Our Story
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-snug mb-6">
            Where{" "}
            <span className="text-starbucks-green">Passion</span> meets{" "}
            <span className="text-starbucks-green">Coffee</span> and{" "}
            <span className="text-starbucks-green">Community</span>
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>Since 1971</strong>, Starbucks Coffee Company has been committed to ethically sourcing and roasting high-quality arabica coffee. Today, with stores around the globe, we are proud to be the premier roaster and retailer of specialty coffee in the world.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Our mission is to inspire and nurture the human spirit – one person, one cup and one neighborhood at a time. Through our unwavering commitment to excellence and our guiding principles, we bring the unique Starbucks Experience to life for every customer.
          </p>
          <p className="text-gray-700 leading-relaxed">
            From our{" "}
            <span className="font-semibold text-starbucks-green">
              ethically sourced coffee beans
            </span>{" "}
            to our innovative beverage creations and commitment to environmental stewardship, we're dedicated to making a positive impact in everything we do.{" "}
            <span className="italic text-gray-900 font-medium">
              "To inspire and nurture the human spirit – one person, one cup, and one neighborhood at a time."
            </span>
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 p-6 bg-white rounded-xl shadow-md border-2 border-starbucks-green/20">
            <div className="text-center">
              <p className="text-3xl font-bold text-starbucks-green">50+</p>
              <p className="text-sm text-gray-600 font-medium">Years Legacy</p>
            </div>
            <div className="text-center border-x border-gray-200">
              <p className="text-3xl font-bold text-starbucks-green">35K+</p>
              <p className="text-sm text-gray-600 font-medium">Stores Worldwide</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-starbucks-green">100M+</p>
              <p className="text-sm text-gray-600 font-medium">Customers Weekly</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

