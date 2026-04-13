import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading amazing products...</div>;

  return (
    <div>
      <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Featured Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-info">
              <h3 className="product-title" title={product.title}>
                {product.title.length > 40 ? `${product.title.substring(0, 40)}...` : product.title}
              </h3>
              <div className="product-price">${product.price.toFixed(2)}</div>
              <Link to={`/product/${product.id}`} className="btn btn-primary view-details">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
