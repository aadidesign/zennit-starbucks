import React from "react";

export default function Founder() {
  return (
    <section className="relative bg-starbucks-green-light text-white flex items-center justify-center px-4 py-16 md:py-20">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
        {/* === Left Images === */}
        <div className="relative w-full md:pb-20">
          {/* Top-left image */}
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80"
            alt="Howard Schultz"
            className="w-80 h-96 object-cover rounded-lg shadow-2xl hidden lg:block border-4 border-white"
          />

          {/* Bottom-right overlapped image */}
          <img
            src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&auto=format&fit=crop&q=80"
            alt="Starbucks Coffee"
            className="w-72 h-80 object-cover lg:absolute left-36 top-52 border-4 border-white rounded-lg shadow-2xl"
          />
        </div>

        {/* === Right Content === */}
        <div className="space-y-6">
          <p className="text-sm font-bold text-starbucks-gold uppercase mb-2 tracking-wider">
            Since 1971
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Meet Our Visionary Leadership{" "}
            <span className="text-starbucks-gold">– Laxman Narasimhan, CEO</span>
          </h2>

          <p className="text-gray-200 text-base sm:text-lg lg:text-xl mb-6 md:mt-10 leading-relaxed">
            Under the leadership of CEO Laxman Narasimhan, Starbucks continues to innovate and expand its mission of inspiring and nurturing the human spirit. With a rich heritage dating back to 1971, Starbucks has grown from a single store in Seattle's Pike Place Market to over 35,000 stores worldwide.
          </p>

          <p className="text-gray-200 text-base sm:text-lg lg:text-xl mb-6 leading-relaxed">
            Our leadership team is committed to building a sustainable future, creating meaningful connections, and delivering the Starbucks Experience with excellence. Through innovation, social responsibility, and a dedication to our partners (employees) and customers, we're shaping the future of coffee culture.
          </p>

          <p className="border-l-4 border-starbucks-gold pl-6 text-gray-100 font-semibold text-lg mb-6 italic">
            "We're not just serving coffee. We're building community, inspiring possibility, and creating moments of connection."
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 flex-1 min-w-[140px]">
              <p className="text-3xl font-bold text-starbucks-gold">35,000+</p>
              <p className="text-sm text-gray-300">Stores Globally</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 flex-1 min-w-[140px]">
              <p className="text-3xl font-bold text-starbucks-gold">400K+</p>
              <p className="text-sm text-gray-300">Partners Worldwide</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 flex-1 min-w-[140px]">
              <p className="text-3xl font-bold text-starbucks-gold">80+</p>
              <p className="text-sm text-gray-300">Countries Served</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

