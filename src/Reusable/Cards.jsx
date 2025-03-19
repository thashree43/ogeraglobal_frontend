import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Cards = ({ products }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return <div>No products to display</div>;
  }

  const handleViewDetails = (id) => {
    navigate(`/productdetail/${id}`);
  };

  return (
    <Row className="my-4">
      {products.map((product) => (
        <Col key={product._id || product.id} lg={4} md={6} sm={12} className="mb-4">
          <Card className="h-100">
            <Card.Img
              variant="top"
              src={product.image[1] || product.imageUrl || 'holder.js/100px180'}
            />
            <Card.Body>
              <Card.Title>{product.title || product.name}</Card.Title>
              <Button variant="primary" onClick={() => handleViewDetails(product._id || product.id)}>
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Cards;
