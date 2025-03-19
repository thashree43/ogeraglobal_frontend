import React, { useState, useEffect } from "react";

const HeroComponent = ({backimage}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full h-[50vh] overflow-hidden bg-gray-900">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={backimage}
          alt="OGERA Home Appliances"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
      </div>

      {/* Content container */}
      <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div
          className={`max-w-lg transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h1 className="text-5xl font-bold text-white leading-tight mb-4">
            Smart Home Solutions for Modern Living
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Discover OGERA's premium range of Electronics & Home appliances designed to make
            your life easier, smarter, and more efficient.
          </p>
          <div className="flex">
            <button
              onClick={scrollToContent}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Products
            </button>
          </div>
        </div>
      </div>

      {/* Scroll down button */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <button
          onClick={scrollToContent}
          className="flex flex-col items-center text-white hover:text-red-400 transition duration-300"
          aria-label="Scroll down"
        >
          <span className="text-sm font-medium mb-2">Scroll Down</span>
          <div className="w-8 h-12 border-2 border-white hover:border-red-400 rounded-full flex justify-center p-1 transition duration-300">
            <div className="w-1 h-3 bg-white hover:bg-red-400 rounded-full animate-bounce mt-1 transition duration-300"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default HeroComponent;
