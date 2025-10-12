import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="pt-20 p-5 lg:p-10 flex flex-col lg:flex-row justify-between gap-12 lg:gap-10 bg-gradient-to-br from-starbucks-cream to-white">
      {/* Left section */}
      <div className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2 items-center lg:items-center text-center lg:text-left">
        {/* Headline */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tighter leading-tight flex flex-col gap-3 font-bold">
          <h1>
            The <span className="text-starbucks-green">best place</span> to
          </h1>
          <div className="flex justify-center lg:justify-start items-center gap-2 sm:gap-4">
            <h1>enjoy</h1>
            <img
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&auto=format&fit=crop&q=80"
              alt="Coffee"
              className="h-12 w-20 sm:h-16 sm:w-28 rounded-full object-cover shadow-lg"
            />
            <h1 className="text-starbucks-green">premium</h1>
          </div>
          <h1>
            <span className="text-starbucks-green">coffee</span> every day
          </h1>
        </div>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mb-8">
          Experience the finest handcrafted beverages, made with ethically sourced beans and crafted by our expert baristas. Your perfect cup awaits.
        </p>

        {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link 
              to="/menu"
              className="px-6 py-3 text-white bg-starbucks-green rounded-full text-sm sm:text-base font-semibold hover:bg-starbucks-green-dark transition-all hover:scale-105 shadow-lg"
            >
              Order Now
            </Link>
            <Link 
              to="/rewards"
              className="bg-starbucks-green rounded-full h-12 w-12 flex items-center justify-center hover:bg-starbucks-green-dark transition cursor-pointer hover:scale-105"
            >
              <svg
                className="text-white w-5 h-5 -rotate-45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full border-2 border-starbucks-green/20 rounded-3xl p-4 bg-white shadow-lg">
          {/* Location Dropdown */}
          <div className="relative w-full sm:min-w-[200px] flex-1">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-starbucks-green"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c4.97-4.97 8-9.18 8-13a8 8 0 10-16 0c0 3.82 3.03 8.03 8 13z" />
              <circle cx="12" cy="8" r="3" />
            </svg>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <select className="w-full pl-10 pr-10 py-3 text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-starbucks-green appearance-none bg-gray-50">
              <option>Find a Store</option>
              <option>New York</option>
              <option>Los Angeles</option>
              <option>Chicago</option>
              <option>Seattle</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:min-w-[250px] flex-1">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-starbucks-green"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search for drinks, food..."
              className="w-full pl-10 pr-3 py-3 text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-starbucks-green bg-gray-50"
            />
          </div>

          {/* Drink Type */}
          <div className="relative w-full sm:min-w-[150px] flex-1">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-starbucks-green"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h16M3 21h16M7 9h8v8a4 4 0 01-8 0V9z" />
            </svg>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <select className="w-full pl-10 pr-10 py-3 text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-starbucks-green appearance-none bg-gray-50">
              <option>All Drinks</option>
              <option>Hot Coffee</option>
              <option>Iced Coffee</option>
              <option>Frappuccino</option>
            </select>
          </div>
        </div>

        {/* Bottom Row - Trust Section */}
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center p-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-starbucks-green/20">
          <Link 
            to="/menu"
            className="bg-starbucks-green/10 border-2 border-starbucks-green rounded-3xl px-6 py-3 text-starbucks-green-dark font-semibold hover:bg-starbucks-green hover:text-white transition-all flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              width="18"
              height="18"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Explore Menu
          </Link>

          <div className="flex gap-4 items-center">
            <p className="font-semibold tracking-tight text-sm text-center">
              Trusted by millions
              <br /> 
              <span className="text-starbucks-green">worldwide</span>
            </p>
            <div className="flex -space-x-3">
              <img
                src="https://randomuser.me/api/portraits/women/32.jpg"
                alt="User 1"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
              />
              <img
                src="https://randomuser.me/api/portraits/men/44.jpg"
                alt="User 2"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
              />
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt="User 3"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
              />
              <img
                src="https://randomuser.me/api/portraits/men/71.jpg"
                alt="User 4"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
              />
              <img
                src="https://randomuser.me/api/portraits/women/85.jpg"
                alt="User 5"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
              />
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-starbucks-green text-white font-bold text-xs border-2 border-white shadow-md">
                +5M
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right section - Images */}
      <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
        <img
          src="https://images.unsplash.com/photo-1587080413959-06b859fb107d?w=600&auto=format&fit=crop&q=80"
          alt="Starbucks Coffee 1"
          className="w-full lg:h-60 sm:h-72 object-cover rounded-2xl shadow-xl hover:scale-105 transition-transform"
        />
        <img
          src="https://images.unsplash.com/photo-1542181961-9590d0c79dab?w=600&auto=format&fit=crop&q=80"
          alt="Starbucks Coffee 2"
          className="w-full lg:h-48 sm:h-64 object-cover rounded-2xl shadow-xl hover:scale-105 transition-transform"
        />
        <img
          src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&auto=format&fit=crop&q=80"
          alt="Starbucks Store"
          className="w-full lg:h-52 sm:h-60 object-cover rounded-2xl shadow-xl hover:scale-105 transition-transform"
        />
        <img
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80"
          alt="Starbucks Interior"
          className="w-full lg:h-72 sm:h-80 object-cover rounded-2xl shadow-xl hover:scale-105 transition-transform"
        />
      </div>
    </div>
  );
};

export default Hero;

