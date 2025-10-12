import React from 'react';

const Services = () => {
  const services = [
    {
      title: "Mobile Ordering",
      image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=600&auto=format&fit=crop&q=80",
      description: "Order ahead and skip the line"
    },
    {
      title: "Delivery Service",
      image: "https://images.unsplash.com/photo-1542181961-9590d0c79dab?w=600&auto=format&fit=crop&q=80",
      description: "Get Starbucks delivered to your door"
    },
    {
      title: "Merchandise",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
      description: "Exclusive mugs, tumblers & accessories"
    },
    {
      title: "Coffee Gear",
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&auto=format&fit=crop&q=80",
      description: "Premium brewing equipment for home"
    }
  ];

  return (
    <div className="px-6 md:px-10 mt-10 bg-gradient-to-b from-gray-50 to-white py-16" id="gift-cards">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-bold text-4xl md:text-5xl tracking-tight text-gray-900">
            How can we <span className="text-starbucks-green">serve</span> you?
          </h1>
          <p className="text-base md:text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore our services designed to make your Starbucks experience even more convenient and enjoyable
          </p>
        </div>
        
        <div className="flex flex-wrap gap-6 justify-center mt-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="w-full sm:w-[280px] bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="relative h-[200px] overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl tracking-tight">
                  {service.title}
                </h3>
              </div>
              <div className="p-5">
                <p className="text-gray-600 text-sm font-medium">{service.description}</p>
                <button className="mt-4 w-full bg-starbucks-green text-white font-semibold py-2.5 rounded-lg hover:bg-starbucks-green-dark transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Service Info */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-starbucks-green/5 border-2 border-starbucks-green/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">🎁 Gift Cards</h3>
            <p className="text-gray-700 mb-6">
              Share the Starbucks experience with friends and loved ones. Our gift cards are perfect for any occasion.
            </p>
            <button className="bg-starbucks-green text-white font-semibold px-6 py-3 rounded-full hover:bg-starbucks-green-dark transition-colors">
              Buy Gift Cards
            </button>
          </div>
          
          <div className="bg-starbucks-gold/10 border-2 border-starbucks-gold/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">⭐ Starbucks Rewards</h3>
            <p className="text-gray-700 mb-6">
              Earn stars with every purchase and unlock free drinks, birthday rewards, and exclusive member perks.
            </p>
            <button className="bg-starbucks-gold text-white font-semibold px-6 py-3 rounded-full hover:bg-starbucks-gold/80 transition-colors">
              Join Rewards
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

