import React, { useState, useEffect } from "react";
import flytawa from "../Images/IM 2.jpg"
import cup from "../Images/IM 3.jpg"
import memory from "../Images/IM 6.jpg"
import mixie from "../Images/IM 7.jpg"


const SlidingCarosole = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel data
  const slides = [
    {
      id: 1,
      heading: "MEET THE GUESTS WITH A STUNNING DISH WITH OGERA PRODUCT",
      backgroundImage:cup,
    },
    {
      id: 2,
      heading: "ELEVATE YOUR COOKING  EXPERIENCE WITH OGERA PRODUCTS",
      backgroundImage: flytawa,
    },
    {
      id: 3,
      heading: "CREATE MEMORIES AROUND THE KITCHEN WITH OGERA PRODUCTS",
      backgroundImage: memory,
    },
    {
        id: 4,
        heading: "GET YOUR HEALTHY DRINK WITH OGERA PRODUCTS",
        backgroundImage: mixie,
      },
  ];

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Navigation handlers
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[50vh] min-h-[300px] overflow-hidden bg-gray-900">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={slide.backgroundImage}
              alt="Dinner table setting"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center text-center px-8">
            <div className="w-full max-w-2xl text-white">
              <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
                {slide.heading}
              </h1>
              <a
                href="/Shop"
                className="inline-block border-2 border-white text-white py-2 px-6 rounded-full text-lg transition-all hover:bg-white hover:text-gray-900"
              >
                Explore all sets
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <div className="absolute left-8 md:left-24 bottom-6 flex space-x-4 z-10">
        <button
          onClick={goToPrevSlide}
          className="w-10 h-10 rounded-full border border-white text-white flex items-center justify-center transition-all hover:bg-white hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6"></path>
          </svg>
        </button>
        <button
          onClick={goToNextSlide}
          className="w-10 h-10 rounded-full border border-white text-white flex items-center justify-center transition-all hover:bg-white hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SlidingCarosole;
