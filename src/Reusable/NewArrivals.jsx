import React, { useState, useEffect } from 'react';
import { useNewarrivalsQuery } from "../api/Clientapi";
import { useNavigate } from "react-router-dom";

const NewArrivals = () => {
  const navigate = useNavigate();
  const { data: categories = [], isLoading, error } = useNewarrivalsQuery();
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Process products when categories data changes or active category changes
  useEffect(() => {
    if (categories && categories.length > 0) {
      let allProducts = [];

      // Extract all products from all categories
      categories.forEach(category => {
        if (category.product && Array.isArray(category.product)) {
          const productsWithCategory = category.product.map(product => ({
            ...product,
            categoryName: category.name,
            categoryId: category._id
          }));

          allProducts = [...allProducts, ...productsWithCategory];
        }
      });

      // Filter by active category if needed
      if (activeCategory !== 'All') {
        const categoryObj = categories.find(cat => cat.name === activeCategory);
        if (categoryObj && categoryObj.product) {
          allProducts = categoryObj.product.map(product => ({
            ...product,
            categoryName: categoryObj.name,
            categoryId: categoryObj._id
          }));
        } else {
          allProducts = [];
        }
      }

      setFilteredProducts(allProducts);
    }
  }, [categories, activeCategory]);

  // Get unique category names for the navigation
  const categoryNames = categories && categories.length > 0
    ? ['All', ...categories.map(category => category.name)]
    : ['All'];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-pulse text-xl font-medium text-red-600">Loading new arrivals...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-xl font-medium text-red-600">Error loading products: {error.message}</div>
      </div>
    );
  }

  // Handle navigation when clicking a product
  const handleProductClick = (productId) => {
    navigate(`/Productdetail/${productId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">New Arrivals</h1>
        <div className="w-20 h-1 bg-red-600 mx-auto"></div>
      </div>

      {/* Category Navigation */}
      <div className="flex justify-center mb-12 overflow-x-auto">
        <div className="inline-flex space-x-4 sm:space-x-6">
          {categoryNames.map(category => (
            <button
              key={category}
              className={`
                px-4 py-2 text-sm sm:text-base font-medium transition-all duration-300 whitespace-nowrap
                ${activeCategory === category
                  ? 'text-red-600 border-b-2 border-red-600 font-bold'
                  : 'text-gray-600 hover:text-red-600 border-b-2 border-transparent hover:border-red-300'}
              `}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <p className="text-xl text-gray-500">No products available in this category.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Featured product (larger) */}
          {filteredProducts.length > 0 && (
            <div
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
              onClick={() => handleProductClick(filteredProducts[0]._id)}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3 relative">
                  {filteredProducts[0].isNew && (
                    <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                      NEW
                    </span>
                  )}
                  <div className="relative h-80 md:h-96 overflow-hidden">
                    <img
                      src={filteredProducts[0].image[1] || '/placeholder-product.jpg'}
                      alt={filteredProducts[0].name}
                      className="w-full h-full object-contain transform transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="md:w-1/3 p-8 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{filteredProducts[0].name}</h2>
                  <p className="text-gray-600 mb-6 line-clamp-3">{filteredProducts[0].description || 'No description available'}</p>
                  <div className="flex items-center mb-4">
                    <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
                      {filteredProducts[0].categoryName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Remaining products grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProducts.slice(1,3).map((product) => (
              <div
                key={product._id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                <div className="relative">
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                      NEW
                    </span>
                  )}
                  <div className="h-64 overflow-hidden">
                    <img
                      src={product.image[1] || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full h-full object-contain transform transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description || 'No description available'}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
                      {product.categoryName}
                    </span>
                    {product.badge && (
                      <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
