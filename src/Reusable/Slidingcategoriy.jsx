import React, { useState, useEffect } from "react";
import { useGetCategoriesQuery } from "../api/Clientapi";
import { useNavigate } from "react-router-dom"; // Added for navigation

const SimpleCategoryProductList = () => {
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate(); // Initialize navigate for routing

  useEffect(() => {
    // When search term changes, update search results
    if (searchTerm.trim() !== "") {
      const results = [];
      categories.forEach(category => {
        const matchingProducts = category.product 
          ? category.product.filter(product => 
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : [];
          
        if (matchingProducts.length > 0) {
          results.push({
            categoryId: category._id,
            categoryName: category.name,
            products: matchingProducts
          });
        }
      });
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchTerm, categories]);

  if (isLoading) return <p className="text-center text-gray-500">Loading categories...</p>;
  if (error) return <p className="text-center text-red-500">Error loading categories</p>;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setHoveredCategory(null);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Added function to navigate to product details page
  const handleProductClick = (productId) => {
    navigate(`/productdetail/${productId}`);
  };

  // Filter products for hover display
  const filteredCategories = categories.map(category => ({
    ...category,
    product: category.product ? category.product.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : []
  }));

  return (
    <div className="category-menu-container">
      <div className="nav-controls">
        {/* Hamburger Menu Button */}
        <button 
          className="hamburger-menu-btn" 
          onClick={toggleMenu}
          aria-label="Toggle category menu"
        >
          <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
        </button>

        {/* Full-width Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <button 
            className="search-button"  
            style={{ background: "red", color: "white" }}  
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Search Results Display (shown when searching) */}
      {showSearchResults && searchTerm.trim() !== "" && (
        <div className="search-results">
          <h2 className="search-results-title">Search Results for: "{searchTerm}"</h2>
          {searchResults.length > 0 ? (
            <div className="search-results-container">
              {searchResults.flatMap(result => 
                result.products.map((product, productIndex) => (
                  <div 
                    key={`${result.categoryId}-${productIndex}`} 
                    className="mini-product-card"
                    onClick={() => handleProductClick(product._id)} // Added onClick handler with product ID
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${product.name} details`}
                  >
                    <div className="mini-product-image">
                      <img 
                        src={product.image[1] || "/placeholder-product.jpg"} 
                        alt={product.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/placeholder-product.jpg";
                        }}
                      />
                    </div>
                    <div className="mini-product-details">
                      <div className="mini-product-name">{product.name}</div>
                      <div className="mini-product-category">{result.categoryName}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <p className="no-search-results">No products found matching "{searchTerm}"</p>
          )}
        </div>
      )}

      {/* Categories Menu (only visible when menu is open) */}
      {isMenuOpen && !showSearchResults && (
        <div className="categories-dropdown">
          <div className="categories-list">
            {categories.map((category) => (
              <button
                key={category._id}
                className={`category-item ${
                  hoveredCategory === category._id ? "active" : ""
                }`}
                onMouseEnter={() => setHoveredCategory(category._id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Product Display when a category is hovered */}
          {hoveredCategory && (
            <div className="category-products">
              <h2 className="category-products-title">
                {categories.find((c) => c._id === hoveredCategory)?.name}
              </h2>
              <ul className="products-list">
                {filteredCategories.find((c) => c._id === hoveredCategory)?.product.length > 0 ? (
                  filteredCategories
                    .find((c) => c._id === hoveredCategory)
                    ?.product.map((product, index) => (
                      <li 
                        key={index} 
                        className="product-item"
                        onClick={() => handleProductClick(product._id)} // Added onClick handler
                        role="button"
                        tabIndex={0}
                      >
                        {product.name}
                      </li>
                    ))
                ) : (
                  <li className="no-products">No products available in this category</li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
           <style jsx>{`
        .category-menu-container {
          width: 100%;
          position: relative;
          font-family: Arial, sans-serif;
        }
        
        .nav-controls {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 10px;
          background-color: #f8f8f8;
          border-bottom: 1px solid #eaeaea;
        }
        
        .hamburger-menu-btn {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 20px;
          margin-right: 15px;
          padding: 0;
          width: 25px;
        }
        
        .hamburger-line {
          background-color: #333;
          height: 2px;
          transition: all 0.3s ease;
          width: 100%;
        }
        
        .hamburger-line.open:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger-line.open:nth-child(2) {
          opacity: 0;
        }
        
        .hamburger-line.open:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
        
        .search-container {
          display: flex;
          flex: 1;
        }
        
        .search-input {
          border: 1px solid #ddd;
          border-radius: 4px 0 0 4px;
          flex: 1;
          padding: 8px 12px;
          font-size: 14px;
        }
        
        .search-button {
          background: red;
          border: none;
          border-radius: 0 4px 4px 0;
          color: white;
          cursor: pointer;
          padding: 8px 12px;
        }
        
        /* Compact search results styling */
        .search-results {
          background-color: white;
          border: 1px solid #eaeaea;
          border-top: none;
          padding: 10px;
          position: absolute;
          width: 100%;
          z-index: 10;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .search-results-title {
          font-size: 16px;
          margin-bottom: 10px;
          padding-bottom: 5px;
          border-bottom: 1px solid #eaeaea;
        }
        
        .search-results-container, .products-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .mini-product-card {
          display: flex;
          width: 150px;
          height: 50px;
          border: 1px solid #eaeaea;
          border-radius: 4px;
          overflow: hidden;
          background-color: #fff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer; /* Added cursor pointer */
        }
        
        .mini-product-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 3px 5px rgba(0,0,0,0.15);
        }
        
        .mini-product-image {
          width: 50px;
          height: 50px;
          flex-shrink: 0;
        }
        
        .mini-product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .mini-product-details {
          flex: 1;
          padding: 5px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .mini-product-name {
          font-size: 12px;
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .mini-product-category {
          font-size: 10px;
          color: #666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .no-search-results, .no-products {
          color: #888;
          font-style: italic;
          text-align: center;
          padding: 20px;
        }
        
        /* Added styles for product items */
        .product-item {
          cursor: pointer;
          padding: 5px;
          border-radius: 3px;
        }
        
        .product-item:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

export default SimpleCategoryProductList;