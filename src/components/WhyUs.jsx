import {
  Coffee,
  Award,
  Heart,
  Users,
  Leaf,
  Shield
} from 'lucide-react';

export default function WhyUs() {
  const features = [
    {
      title: "Premium Quality Beans",
      desc: "100% ethically sourced Arabica coffee beans from the finest farms.",
      icon: <Coffee className="w-16 h-16 text-starbucks-green" strokeWidth={1.25} />,
    },
    {
      title: "Award-Winning Beverages",
      desc: "Recognized globally for our innovative and delicious drink creations.",
      icon: <Award className="w-16 h-16 text-starbucks-green" strokeWidth={1.25} />,
    },
    {
      title: "Community Connection",
      desc: "Building relationships and creating a welcoming third place.",
      icon: <Users className="w-16 h-16 text-starbucks-green" strokeWidth={1.25} />,
    },
    {
      title: "Sustainability First",
      desc: "Committed to environmental stewardship and ethical practices.",
      icon: <Leaf className="w-16 h-16 text-starbucks-green" strokeWidth={1.25} />,
    },
    {
      title: "Rewards Program",
      desc: "Earn stars and get free drinks, food, and exclusive offers.",
      icon: <Heart className="w-16 h-16 text-starbucks-green" strokeWidth={1.25} />,
    },
    {
      title: "Quality Guaranteed",
      desc: "Every beverage is handcrafted to perfection or we'll remake it.",
      icon: <Shield className="w-16 h-16 text-starbucks-green" strokeWidth={1.25} />,
    },
  ];

  return (
    <section className="bg-white py-16 px-4 md:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Why choose <span className="text-starbucks-green">Starbucks</span>? ☕
        </h2>
        <p className="text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
          More than coffee, we offer an experience. Discover what makes us the world's most beloved coffeehouse.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 border-t-2 border-l-2 border-starbucks-green/20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border-r-2 border-b-2 border-starbucks-green/20 p-8 md:p-10 flex flex-col items-center text-center hover:bg-starbucks-cream/50 transition-all duration-300 group"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h4 className="text-xl md:text-2xl tracking-tight font-bold text-gray-900 mb-3">
                {feature.title}
              </h4>
              <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="mt-12 bg-gradient-to-r from-starbucks-green to-starbucks-green-dark text-white rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Join Starbucks® Rewards</h3>
          <p className="text-lg mb-6 opacity-90">
            Join now and start earning stars with every purchase. Get free drinks, food, and more!
          </p>
          <button className="bg-white text-starbucks-green font-bold px-8 py-4 rounded-full hover:bg-starbucks-cream transition-all hover:scale-105 shadow-lg">
            Sign Up Now - It's Free
          </button>
        </div>
      </div>
    </section>
  );
}

