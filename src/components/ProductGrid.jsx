import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProductGrid = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
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
      name: "Caffè Americano", 
      place: "Hot Coffees", 
      price: "$3.65", 
      rating: 4.7, 
      reviews: 8245, 
      link: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80" 
    },
    { 
      name: "Iced Caramel Macchiato", 
      place: "Iced Espresso", 
      price: "$5.45", 
      rating: 4.9, 
      reviews: 12432, 
      link: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop&q=80" 
    },
    { 
      name: "Pumpkin Spice Latte", 
      place: "Seasonal Favorite", 
      price: "$5.95", 
      rating: 4.9, 
      reviews: 15621, 
      link: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop&q=80" 
    },
    { 
      name: "Java Chip Frappuccino®", 
      place: "Frappuccino® Blended Beverages", 
      price: "$5.95", 
      rating: 4.8, 
      reviews: 9856, 
      link: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80" 
    },
    { 
      name: "Nitro Cold Brew", 
      place: "Cold Coffees", 
      price: "$4.95", 
      rating: 4.8, 
      reviews: 7234, 
      link: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=600&auto=format&fit=crop&q=80" 
    },
    { 
      name: "Iced Matcha Tea Latte", 
      place: "Iced Teas", 
      price: "$5.25", 
      rating: 4.7, 
      reviews: 6823, 
      link: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80" 
    },
    { 
      name: "Vanilla Sweet Cream Cold Brew", 
      place: "Cold Coffees", 
      price: "$4.95", 
      rating: 4.9, 
      reviews: 11234, 
      link: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80" 
    },
    { 
      name: "Caramel Frappuccino®", 
      place: "Frappuccino® Blended Beverages", 
      price: "$5.45", 
      rating: 4.8, 
      reviews: 10476, 
      link: "https://images.unsplash.com/photo-1542181961-9590d0c79dab?w=600&auto=format&fit=crop&q=80" 
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-white to-starbucks-cream" id="menu" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-base font-semibold text-starbucks-green tracking-tighter uppercase mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Handcrafted Beverages
          </motion.h2>
          <motion.p 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tighter leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Trending drinks you'll <span className="text-starbucks-green">love</span>
          </motion.p>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Expertly crafted and made to order, our beverages are the perfect way to brighten your day
          </motion.p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {trendingDrinks.map((drink, index) => (
            <motion.div
              key={index}
              className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 bg-white"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Drink Image */}
              <motion.img
                src={drink.link}
                alt={drink.name}
                className="w-full h-64 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                onError={(e) => {
                  e.target.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5YzlkYWEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                }}
              />

              {/* Price Badge */}
              <div className="absolute top-3 right-3 bg-starbucks-green text-white backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md text-sm font-bold tracking-tight">
                {drink.price}
              </div>

              {/* Bottom Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
                <h3 className="text-white text-lg font-bold truncate tracking-tight">{drink.name}</h3>
                <p className="text-white/90 text-sm flex items-center truncate tracking-tight">
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
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/menu"
              className="bg-starbucks-green text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-starbucks-green-dark shadow-lg inline-flex items-center gap-2 tracking-tight"
            >
              View Full Menu
              <svg className="w-5 h-5 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductGrid;

