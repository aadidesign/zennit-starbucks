import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = () => {
  // SVG Icon Components
  const MapPin = ({ size = 24, className = "" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );

  const Star = ({ size = 24, className = "", filled = false }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );

  const trendingDrinks = [
    { 
      name: "Caramel Macchiato", 
      place: "Signature Espresso Beverage", 
      price: "$5.95", 
      rating: 4.9, 
      reviews: 2845, 
      link: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=600&auto=format&fit=crop&q=80" 
    },
    { 
      name: "Iced White Mocha", 
      place: "Cold Beverages", 
      price: "$6.25", 
      rating: 4.8, 
      reviews: 1932, 
      link: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop&q=80" 
    },
    { 
      name: "Pumpkin Spice Latte", 
      place: "Seasonal Favorite", 
      price: "$6.45", 
      rating: 4.9, 
      reviews: 3421, 
      link: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop&q=80" 
    },
    { 
      name: "Java Chip Frappuccino", 
      place: "Blended Beverages", 
      price: "$5.75", 
      rating: 4.7, 
      reviews: 2156, 
      link: "https://images.unsplash.com/photo-1587080413959-06b859fb107d?w=600&auto=format&fit=crop&q=80" 
    },
    { 
      name: "Nitro Cold Brew", 
      place: "Cold Brew Coffee", 
      price: "$5.45", 
      rating: 4.8, 
      reviews: 1678, 
      link: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=600&auto=format&fit=crop&q=80" 
    },
    { 
      name: "Matcha Green Tea Latte", 
      place: "Hot Teas", 
      price: "$5.95", 
      rating: 4.6, 
      reviews: 1423, 
      link: "https://images.unsplash.com/photo-1536013669715-42bab8b45d11?w=600&auto=format&fit=crop&q=80" 
    },
    { 
      name: "Vanilla Sweet Cream", 
      place: "Cold Brew Series", 
      price: "$5.25", 
      rating: 4.9, 
      reviews: 2234, 
      link: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80" 
    },
    { 
      name: "Cinnamon Roll Frappuccino", 
      place: "Blended Beverages", 
      price: "$6.75", 
      rating: 4.8, 
      reviews: 1876, 
      link: "https://images.unsplash.com/photo-1542181961-9590d0c79dab?w=600&auto=format&fit=crop&q=80" 
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-white to-starbucks-cream" id="menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-starbucks-green tracking-wide uppercase mb-2">
            Handcrafted Beverages
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trending drinks you'll <span className="text-starbucks-green">love</span>
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Expertly crafted and made to order, our beverages are the perfect way to brighten your day
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {trendingDrinks.map((drink, index) => (
            <div
              key={index}
              className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 bg-white"
            >
              {/* Drink Image */}
              <img
                src={drink.link}
                alt={drink.name}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5YzlkYWEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                }}
              />

              {/* Price Badge */}
              <div className="absolute top-3 right-3 bg-starbucks-green text-white backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md text-sm font-bold">
                {drink.price}
              </div>

              {/* Bottom Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
                <h3 className="text-white text-lg font-bold truncate">{drink.name}</h3>
                <p className="text-white/90 text-sm flex items-center truncate">
                  <MapPin size={14} className="mr-1 flex-shrink-0" />
                  {drink.place}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  {/* Rating */}
                  <div className="flex items-center">
                    <div className="flex text-starbucks-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          filled={i < Math.floor(drink.rating)}
                          className={i < Math.floor(drink.rating) ? "text-starbucks-gold" : "text-gray-400"}
                        />
                      ))}
                    </div>
                    <span className="ml-1.5 text-xs font-semibold text-white">
                      {drink.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-[11px] text-white/80 font-medium">
                    {drink.reviews} reviews
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            to="/menu"
            className="bg-starbucks-green text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-starbucks-green-dark hover:scale-105 shadow-lg inline-flex items-center gap-2"
          >
            View Full Menu
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;

