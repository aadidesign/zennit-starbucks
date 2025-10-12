import React from 'react';
import WhyUs from '../components/WhyUs';
import { Star, Gift, Zap, Award } from 'lucide-react';

const RewardsPage = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-starbucks-green to-starbucks-green-dark text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Starbucks® Rewards
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Free coffee is a tap away
          </p>
          <button className="bg-white text-starbucks-green font-bold px-8 py-4 rounded-full hover:bg-starbucks-cream transition-all text-lg">
            Join Now
          </button>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Getting started is easy</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-starbucks-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-starbucks-green">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Create an account</h3>
              <p className="text-gray-600">Join Starbucks® Rewards to earn Stars with every purchase</p>
            </div>
            <div className="text-center">
              <div className="bg-starbucks-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-starbucks-green">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Order and pay</h3>
              <p className="text-gray-600">Use our app to pay and collect Stars with every purchase</p>
            </div>
            <div className="text-center">
              <div className="bg-starbucks-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-starbucks-green">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Get rewarded</h3>
              <p className="text-gray-600">Redeem your Stars for free drinks, food, and more</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Tiers */}
      <div className="py-16 px-4 bg-starbucks-cream">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Rewards you'll love</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { stars: '25', title: 'Customize your drink', icon: <Zap className="w-12 h-12" /> },
              { stars: '50', title: 'Brewed hot coffee, tea or bakery item', icon: <Gift className="w-12 h-12" /> },
              { stars: '150', title: 'Handcrafted drink, hot breakfast or parfait', icon: <Star className="w-12 h-12" /> },
              { stars: '200', title: 'Lunch sandwich, protein box or salad', icon: <Award className="w-12 h-12" /> },
            ].map((reward, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 flex items-start gap-6 hover:shadow-xl transition-all">
                <div className="text-starbucks-green flex-shrink-0">
                  {reward.icon}
                </div>
                <div>
                  <div className="text-starbucks-green font-bold text-2xl mb-2">{reward.stars} ★</div>
                  <h3 className="text-xl font-bold mb-2">{reward.title}</h3>
                  <p className="text-gray-600">Redeem {reward.stars} Stars for your favorite items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <WhyUs />
    </div>
  );
};

export default RewardsPage;

