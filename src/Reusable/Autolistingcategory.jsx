import React, { useState, useEffect } from "react";
import { useCategorycarouselQuery } from "../api/Clientapi";

const CategoryCarousel = () => {
    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
    const SEARCH_ID = import.meta.env.VITE_CUSTOM_SEARCH_ID;

    const { data: categories, isLoading, error } = useCategorycarouselQuery();
    const [categoryImages, setCategoryImages] = useState({});
    const [startIndex, setStartIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(
      typeof window !== "undefined" ? window.innerWidth : 1200
    );

    // Responsive settings
    const getVisibleCount = () => {
      if (windowWidth < 640) return 2;      // Mobile
      if (windowWidth < 768) return 3;      // Larger mobile/small tablet
      if (windowWidth < 1024) return 4;     // Tablet
      return 5;                             // Desktop
    };
    
    const visibleCount = getVisibleCount();

    // Handle window resize for responsive behavior
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      
      window.addEventListener("resize", handleResize);
      
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    useEffect(() => {
        if (categories) {
          const fetchImages = async () => {
            const imagesMap = {};
            for (const category of categories) {
              imagesMap[category.name] = await fetchGoogleImage(category.name);
            }
            setCategoryImages(imagesMap);
          };
          fetchImages();
        }
    }, [categories]);
    
    const fetchGoogleImage = async (query) => {
        try {
          const encodedQuery = encodeURIComponent(query);
          const response = await fetch(
            `https://www.googleapis.com/customsearch/v1?q=${encodedQuery}&searchType=image&key=${API_KEY}&cx=${SEARCH_ID}`
          );
          const data = await response.json();
          return data.items?.[0]?.link || "/images/default-category.jpg";
        } catch (error) {
          console.error("Error fetching image:", error);
          return "/images/default-category.jpg";
        }
    };

    if (isLoading) return (
        <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-t-red-500 border-b-red-700 border-l-red-600 border-r-red-600 rounded-full animate-spin"></div>
        </div>
    );

    if (error) return (
        <div className="text-center text-red-600 p-8 bg-red-50 rounded-lg shadow">
            <p className="text-lg font-medium">Error loading categories!</p>
            <p className="text-sm mt-2">Please try again later.</p>
        </div>
    );

    const nextSlide = () => {
        if (startIndex + visibleCount < categories.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const prevSlide = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const handleCategoryHover = (index) => {
        setActiveIndex(index);
    };

    // Get size for category circles based on screen width
    const getCategorySize = () => {
      if (windowWidth < 640) return "w-16 h-16";  // Small on mobile
      if (windowWidth < 768) return "w-20 h-20";  // Medium on small tablets
      return "w-28 h-28";                         // Large on desktop
    };
    
    const categorySize = getCategorySize();

    return (
        <div className="relative w-full mx-auto py-8 md:py-12 lg:py-16 px-4">
            {/* Stylish Header - Responsive text sizes */}
            <div className="text-center mb-6 md:mb-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-700 to-white text-transparent bg-clip-text mb-2 md:mb-3">
                    Explore Categories
                </h1>
                <div className="flex justify-center items-center">
                    <div className="h-1 w-8 md:w-12 bg-red-600 rounded-full"></div>
                    <div className="h-1 w-16 md:w-24 bg-red-600 mx-2 rounded-full"></div>
                    <div className="h-1 w-8 md:w-12 bg-red-600 rounded-full"></div>
                </div>
            </div>

            <div className="relative">
                {/* Left Arrow - Responsive positioning */}
                {startIndex > 0 && (
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-red-600 to-white text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 z-10 flex items-center justify-center"
                        aria-label="Previous categories"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}

                {/* Category List - Responsive spacing */}
                <div className="flex justify-center mx-10">
                    <div className="flex space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-10 overflow-hidden">
                        {categories.slice(startIndex, startIndex + visibleCount).map((category, index) => (
                            <div
                                key={index}
                                className="group flex flex-col items-center"
                                onMouseEnter={() => handleCategoryHover(index)}
                                onClick={() => handleCategoryHover(index)} /* Added for touch devices */
                            >
                                <div className={`relative ${categorySize} rounded-full overflow-hidden shadow-xl border-4 
                                  ${index === activeIndex ? 'border-red-500 scale-110' : 'border-gray-200 hover:border-red-300'} 
                                  transition-all duration-300 transform hover:scale-110`}
                                >
                                    {/* Image */}
                                    {categoryImages[category.name] ? (
                                        <img src={categoryImages[category.name]} alt={category.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-red-50">
                                            <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 border-4 border-t-red-500 border-red-200 rounded-full animate-spin"></div>
                                        </div>
                                    )}

                                    {/* Pulse effect */}
                                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100">
                                        <div className="absolute inset-0 rounded-full animate-ping bg-red-500 opacity-20"></div>
                                    </div>
                                </div>

                                {/* Category name - Responsive text sizes */}
                                <div className="mt-2 md:mt-4 relative">
                                    <p className={`text-sm sm:text-base md:text-lg font-medium bg-gradient-to-r from-red-700 to-white text-transparent bg-clip-text
                                      transition-all duration-300 ${index === activeIndex ? 'scale-110' : ''}`}>
                                        {category.name}
                                    </p>

                                    {/* Underline effect */}
                                    <div className={`h-0.5 bg-gradient-to-r from-red-500 to-white mt-1 transition-all duration-300
                                      ${index === activeIndex ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Arrow - Responsive positioning */}
                {startIndex + visibleCount < categories.length && (
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-white to-red-600 text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 z-10 flex items-center justify-center"
                        aria-label="Next categories"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Pagination dots - Made smaller on mobile */}
            <div className="flex justify-center mt-4 md:mt-6 lg:mt-8 space-x-2 md:space-x-3">
                {Array.from({ length: Math.ceil((categories?.length || 0) / visibleCount) }).map((_, idx) => (
                    <button
                        key={idx}
                        className={`transition-all duration-300 ${idx === Math.floor(startIndex / visibleCount)
                                ? 'w-6 md:w-8 h-1.5 md:h-2 bg-gradient-to-r from-red-500 to-white rounded-full'
                                : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                            }`}
                        onClick={() => setStartIndex(idx * visibleCount)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryCarousel;