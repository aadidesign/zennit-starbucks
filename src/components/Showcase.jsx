import React from 'react';

const Showcase = () => {
  const experiences = [
    {
      id: 1,
      title: 'Starbucks Reserve',
      price: 'Premium Experience',
      address: 'Seattle, Washington - Flagship Store',
      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      title: 'Drive-Thru Service',
      price: 'Quick & Convenient',
      address: 'Available at 15,000+ locations',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      title: 'Mobile Order & Pay',
      price: 'Skip the Line',
      address: 'Order ahead through our app',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      title: 'Starbucks Delivers',
      price: 'Delivered to You',
      address: 'Available via Uber Eats & DoorDash',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 5,
      title: 'Community Stores',
      price: 'Local Impact',
      address: 'Supporting local communities',
      image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 6,
      title: 'Roastery Experience',
      price: 'Coffee Theatre',
      address: 'Immersive coffee journey',
      image: 'https://images.unsplash.com/photo-1501492673258-6d77b9e8e0c7?w=800&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="bg-white py-16 px-4 md:px-12" id="rewards">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Experience Starbucks in <span className="text-starbucks-green">unique ways</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-4xl mx-auto leading-relaxed">
            From our iconic cafes to innovative digital experiences, discover the many ways to enjoy your favorite Starbucks beverages wherever you are.
          </p>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {experiences.map((experience, idx) => (
            <div 
              key={experience.id}
              className={`space-y-4 ${idx === 1 || idx === 4 ? 'md:mt-8' : ''}`}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-starbucks-green/10">
                <img 
                  src={experience.image} 
                  alt={experience.title}
                  className={`w-full object-cover ${idx === 1 || idx === 4 ? 'h-80' : 'h-64'}`}
                />
                <div className="p-5 bg-gradient-to-b from-white to-starbucks-cream/30">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{experience.title}</h3>
                    <span className="font-semibold text-starbucks-green text-sm bg-starbucks-green/10 px-3 py-1 rounded-full">
                      {experience.price}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-1.5 text-starbucks-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {experience.address}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="bg-starbucks-green/10 border-2 border-starbucks-green text-starbucks-green-dark font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-starbucks-green hover:text-white hover:scale-105 inline-flex items-center gap-2 shadow-md">
            Explore All Locations
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Showcase;

