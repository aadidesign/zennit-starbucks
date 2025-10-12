import React from 'react';
import ProductGrid from '../components/ProductGrid';

const MenuPage = () => {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <div className="bg-gradient-to-b from-starbucks-cream to-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Our <span className="text-starbucks-green">Menu</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handcrafted beverages and delicious food offerings, made with premium ingredients and expert care.
          </p>
        </div>
      </div>
      
      {/* Products */}
      <ProductGrid />
      
      {/* Additional Menu Categories */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Categories</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {['Hot Coffees', 'Cold Coffees', 'Frappuccino®', 'Teas', 'Food', 'Bakery', 'Merchandise', 'At Home Coffee'].map((category, idx) => (
              <div key={idx} className="bg-starbucks-cream rounded-xl p-6 text-center hover:shadow-lg transition-all cursor-pointer">
                <h3 className="font-bold text-lg text-gray-900">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;

