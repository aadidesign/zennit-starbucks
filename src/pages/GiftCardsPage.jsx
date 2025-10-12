import React from 'react';
import Services from '../components/Services';
import { Gift, CreditCard, Smartphone } from 'lucide-react';

const GiftCardsPage = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-starbucks-gold to-amber-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Gift className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Starbucks Gift Cards
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Share the love with a Starbucks Gift Card
          </p>
          <button className="bg-white text-starbucks-gold font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all text-lg">
            Buy a Gift Card
          </button>
        </div>
      </div>

      {/* Featured Cards */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Gift Cards</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Birthday Gift Card', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400', amount: '$25.00' },
              { name: 'Thank You Card', image: 'https://images.unsplash.com/photo-1464550838636-1a3496df938b?w=400', amount: '$50.00' },
              { name: 'Celebration Card', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400', amount: '$100.00' },
            ].map((card, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer">
                <img src={card.image} alt={card.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{card.name}</h3>
                  <p className="text-starbucks-green font-bold text-2xl mb-4">{card.amount}</p>
                  <button className="w-full bg-starbucks-green text-white font-semibold py-3 rounded-lg hover:bg-starbucks-green-dark transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How to Use */}
      <div className="py-16 px-4 bg-starbucks-cream">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Ways to pay with your gift card</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center">
              <Smartphone className="w-16 h-16 mx-auto mb-4 text-starbucks-green" />
              <h3 className="text-xl font-bold mb-3">In the app</h3>
              <p className="text-gray-600">Add your card to the Starbucks app and pay seamlessly</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center">
              <CreditCard className="w-16 h-16 mx-auto mb-4 text-starbucks-green" />
              <h3 className="text-xl font-bold mb-3">In store</h3>
              <p className="text-gray-600">Present your physical or digital card at checkout</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center">
              <Gift className="w-16 h-16 mx-auto mb-4 text-starbucks-green" />
              <h3 className="text-xl font-bold mb-3">Reload anytime</h3>
              <p className="text-gray-600">Keep your card funded with auto-reload options</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <Services />

      {/* CTA Section */}
      <div className="bg-starbucks-green text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            The perfect gift for coffee lovers
          </h2>
          <p className="text-lg mb-8 opacity-90">
            From birthdays to holidays, Starbucks Gift Cards are the perfect way to show you care.
          </p>
          <button className="bg-white text-starbucks-green font-bold px-8 py-4 rounded-full hover:bg-starbucks-cream transition-all text-lg">
            Shop Gift Cards
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiftCardsPage;

