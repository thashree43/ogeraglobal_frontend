import React, { useState, useEffect } from 'react';
import Cards from '../../Reusable/Cards';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import debounce from 'lodash.debounce';
import { useGetproductsQuery } from "../../api/Clientapi";

const ListingProduct = () => {
  // Use RTK Query hook to fetch products
  const { data: categoryProducts, isLoading, isError } = useGetproductsQuery();
  
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const itemsPerPage = 6;

  // Process the data from API when it arrives
  useEffect(() => {
    if (categoryProducts) {
      // Extract all products from categories
      const products = [];
      const uniqueCategories = new Set(['All']);
      
      categoryProducts.forEach(category => {
        if (category.product && Array.isArray(category.product)) {
          category.product.forEach(product => {
            products.push({
              ...product,
              category: category.name || 'Uncategorized'
            });
          });
          
          if (category.name) {
            uniqueCategories.add(category.name);
          }
        }
      });
      
      setAllProducts(products);
      setFilteredProducts(products);
      setCategories([...uniqueCategories]);
    }
  }, [categoryProducts]);

  // Filter products based on search, category, and sort
  useEffect(() => {
    if (allProducts.length === 0) return;
    
    let filtered = allProducts.filter(product =>
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (sortBy === 'name') {
      filtered.sort((a, b) => a.title?.localeCompare(b.title || ''));
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy, allProducts]);

  // Debounced search handler
  const debouncedSearch = debounce((value) => {
    setSearchTerm(value);
  }, 300);

  const handleSearchChange = (event) => {
    debouncedSearch(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Display loading or error states
  if (isLoading) {
    return <div className="text-center p-5">Loading products...</div>;
  }

  if (isError) {
    return <div className="text-center p-5 text-danger">Error loading products. Please try again later.</div>;
  }

  return (
    <div className="container my-4">
      <Row>
        <Col md={3} className="border-end">
          <h5>Filter by Category</h5>
          <Form.Select onChange={handleCategoryChange} value={selectedCategory}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
          
          <h5 className="mt-3">Sort by</h5>
          <Form.Select onChange={handleSortChange} value={sortBy}>
            <option value="">None</option>
            <option value="name">Name</option>
          </Form.Select>
        </Col>
        
        <Col md={9}>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search product..."
              onChange={handleSearchChange}
            />
          </InputGroup>
          
          {filteredProducts.length > 0 ? (
            <>
              <Cards products={currentItems} />
              
              {totalPages > 1 && (
                <Pagination className="mt-3 justify-content-center">
                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item 
                      key={index} 
                      active={index + 1 === currentPage} 
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              )}
            </>
          ) : (
            <div className="text-center p-5">
              <h4>No products found</h4>
              <p>Try changing your search criteria or filter settings.</p>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ListingProduct;