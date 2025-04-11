import React, { useState, useEffect } from "react";

const HeroComponent = ({ backimage }) => {
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
    <div className={`relative h-screen w-full overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${backimage || "/api/placeholder/1920/1080"})`,
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Content container */}
      <div className="relative flex h-full items-center justify-center px-4 md:px-8">
        <div className="text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            Smart Home Solutions for Modern Living
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 md:mb-10">
            Discover OGERA's premium range of Electronics & Home appliances designed to make 
            your life easier, smarter, and more efficient.
          </p>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg text-lg transition-colors duration-300"
            onClick={scrollToContent}
          >
            Explore Products
          </button>
        </div>
      </div>
      
      {/* Scroll down button */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <button 
          className="text-white flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity duration-300"
          onClick={scrollToContent}
        >
          <span className="mb-2 text-sm md:text-base">Scroll Down</span>
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HeroComponent;